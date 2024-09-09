export interface RpcClientOptions {
  protocol?: 'http' | 'https';
  host?: string;
  port?: number;
  user?: string;
  pass?: string;
  disableAgent?: boolean;
  rejectUnauthorized?: boolean;
}