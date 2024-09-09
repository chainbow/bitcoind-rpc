"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const url_1 = require("url");
const BufferWriter_1 = require("./BufferWriter");
const rpcMethodSpecs_1 = require("./rpcMethodSpecs");
class RpcClient {
    constructor(opts = {}) {
        var _a;
        if (typeof opts === 'string') {
            opts = RpcClient.decodeURL(opts);
        }
        this.host = opts.host || '127.0.0.1';
        this.port = opts.port || 8332;
        this.user = opts.user || 'user';
        this.pass = opts.pass || 'pass';
        this.protocol = opts.protocol === 'http' ? http_1.default : https_1.default;
        this.disableAgent = opts.disableAgent || false;
        this.rejectUnauthorized = (_a = opts.rejectUnauthorized) !== null && _a !== void 0 ? _a : true;
        this.rpcSpecs = rpcMethodSpecs_1.rpcMethodSpecs;
        return new Proxy(this, {
            get(target, name) {
                if (name in target) {
                    return target[name];
                }
                const methodName = name.toLowerCase();
                return (...params) => {
                    return target.callRpc(methodName, params);
                };
            }
        });
    }
    static decodeURL(str) {
        const parsedUrl = new url_1.URL(str);
        return {
            host: parsedUrl.hostname,
            port: parseInt(parsedUrl.port, 10),
            protocol: parsedUrl.protocol.slice(0, -1),
            user: parsedUrl.username,
            pass: parsedUrl.password,
        };
    }
    async callRpc(methodName, params) {
        const spec = this.rpcSpecs[methodName];
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
    rpc(request) {
        return new Promise((resolve, reject) => {
            const auth = Buffer.from(`${this.user}:${this.pass}`).toString('base64');
            const options = {
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
                const bufferWriter = new BufferWriter_1.BufferWriter();
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
                        error.code = 429;
                        reject(error);
                        return;
                    }
                    try {
                        const parsedBuffer = JSON.parse(buffer.toString());
                        if (parsedBuffer.error) {
                            reject(new Error(`Bitcoin JSON-RPC: ${parsedBuffer.error.message}`));
                        }
                        else {
                            resolve(parsedBuffer.result);
                        }
                    }
                    catch (e) {
                        console.error(e);
                        console.error(buffer.toString());
                        console.error(`HTTP Status code: ${res.statusCode}`);
                        reject(new Error(`Bitcoin JSON-RPC: Error Parsing JSON: ${e.message}`));
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
    // You can still define specific methods if needed
    async getBlockCount() {
        return this.callRpc('getblockcount', []);
    }
}
exports.default = RpcClient;
