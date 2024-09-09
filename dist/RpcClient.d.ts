import { RpcClientOptions } from './types/RpcClientOptions';
declare class RpcClient {
    private host;
    private port;
    private user;
    private pass;
    private protocol;
    private disableAgent;
    private rejectUnauthorized;
    private rpcSpecs;
    constructor(opts?: RpcClientOptions);
    private static decodeURL;
    private callRpc;
    private rpc;
    getBlockCount(): Promise<number>;
}
export default RpcClient;
