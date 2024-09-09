import http from 'http';
import https from 'https';
import { URL } from 'url';
import { RpcClientOptions } from './types/RpcClientOptions';
import { RpcMethods, RpcMethodSpecs, RpcRequest, RpcResponse } from './types/RpcMethods';
import { BufferWriter } from './BufferWriter';
import { rpcMethodSpecs } from './rpcMethodSpecs';

class RpcClient {
  private host: string;
  private port: number;
  private user: string;
  private pass: string;
  private protocol: typeof http | typeof https;
  private disableAgent! : boolean;
  private rejectUnauthorized!: boolean;
  private rpcSpecs!: RpcMethodSpecs;

  constructor(options?: RpcClientOptions | string) {
    if (typeof options === 'string') {
      const url = new URL(options);
      this.host = url.hostname;
      this.port = parseInt(url.port, 10);
      this.user = url.username;
      this.pass = url.password;
      this.protocol = url.protocol === 'https:' ? https : http;
    } else {
      // 现有的初始化逻辑
      this.host = options?.host || '127.0.0.1';
      this.port = options?.port || 8332;
      this.user = options?.user || 'user';
      this.pass = options?.pass || 'pass';
      this.protocol = options?.protocol === 'http' ? http : https;
      this.disableAgent = options?.disableAgent || false;
      this.rejectUnauthorized = options?.rejectUnauthorized ?? true;
      this.rpcSpecs = rpcMethodSpecs;
    }

    return new Proxy(this, {
      get(target: RpcClient, name: string): any {
        if (name in target) {
          return target[name as keyof RpcClient];
        }
        
        const methodName = name.toLowerCase();
        
        return (...params: any[]) => {
          return target.callRpc(methodName, params);
        };
      }
    });
  }

  private static decodeURL(str: string): RpcClientOptions {
    const parsedUrl = new URL(str);
    return {
      host: parsedUrl.hostname,
      port: parseInt(parsedUrl.port, 10),
      protocol: parsedUrl.protocol.slice(0, -1) as 'http' | 'https',
      user: parsedUrl.username,
      pass: parsedUrl.password,
    };
  }

  private async callRpc(methodName: string, params: any[]): Promise<any> {
    const spec = this.rpcSpecs[methodName as RpcMethods];
    if (!spec) {
      throw new Error(`Unknown RPC method: ${methodName}`);
    }

    if (params.length < spec.minParams || params.length > spec.maxParams) {
      throw new Error(`Invalid number of parameters for ${methodName}. Expected ${spec.minParams} to ${spec.maxParams}, got ${params.length}`);
    }

    // Validate parameter types
    params.forEach((param, index) => {
      const paramSpec = spec.params[index];
      if (paramSpec && typeof param !== paramSpec.type) {
        throw new Error(`Invalid type for parameter ${paramSpec.name} in ${methodName}. Expected ${paramSpec.type}, got ${typeof param}`);
      }
    });

    return this.rpc({
      method: methodName,
      params: params
    });
  }

  private rpc(request: RpcRequest): Promise<any> {
    return new Promise((resolve, reject) => {
      const auth = Buffer.from(`${this.user}:${this.pass}`).toString('base64');
      const options: https.RequestOptions = {
        host: this.host,
        port: this.port,
        path: '/',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${auth}`,
        },
        rejectUnauthorized: this.rejectUnauthorized,
        agent: this.disableAgent ? false : undefined,
      };

      const req = this.protocol.request(options, (res) => {
        const bufferWriter = new BufferWriter();
        res.on('data', (chunk) => bufferWriter.write(Buffer.from(chunk)));
        res.on('end', () => {
          const buffer = bufferWriter.toBuffer();
          if (res.statusCode === 401) {
            reject(new Error('Bitcoin JSON-RPC: Connection Rejected: 401 Unauthorized'));
            return;
          }
          if (res.statusCode === 403) {
            reject(new Error('Bitcoin JSON-RPC: Connection Rejected: 403 Forbidden'));
            return;
          }
          if (res.statusCode === 500 && buffer.toString('utf8') === 'Work queue depth exceeded') {
            const error = new Error('Bitcoin JSON-RPC: Work queue depth exceeded');
            (error as any).code = 429;
            reject(error);
            return;
          }
          try {
            const parsedBuffer = JSON.parse(buffer.toString()) as RpcResponse;
            if (parsedBuffer.error) {
              reject(new Error(`Bitcoin JSON-RPC: ${parsedBuffer.error.message}`));
            } else {
              resolve(parsedBuffer.result);
            }
          } catch (e) {
            console.error(e);
            console.error(buffer.toString());
            console.error(`HTTP Status code: ${res.statusCode}`);
            reject(new Error(`Bitcoin JSON-RPC: Error Parsing JSON: ${(e as Error).message}`));
          }
        });
      });

      req.on('error', (e) => {
        console.error(`Request Error: ${e.message}`);
        reject(new Error(`Bitcoin JSON-RPC: Request Error: ${e.message}`));
      });

      req.write(JSON.stringify(request));
      req.end();
    });
  }
}

export default RpcClient;