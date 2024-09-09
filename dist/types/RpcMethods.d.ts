export declare enum RpcMethods {
    GetBlock = "getblock",
    GetBlockchainInfo = "getblockchaininfo",
    GetBlockHash = "getblockhash",
    GetBlockCount = "getblockcount",
    GetConnectionCount = "getconnectioncount",
    GetInfo = "getinfo",
    GetNewAddress = "getnewaddress",
    GetPeerInfo = "getpeerinfo",
    GetRawMempool = "getrawmempool",
    GetRawTransaction = "getrawtransaction",
    GetTxOut = "gettxout",
    GetWork = "getwork",
    Help = "help",
    ImportPrivKey = "importprivkey",
    KeyPoolRefill = "keypoolrefill",
    ListAccounts = "listaccounts",
    ListReceivedByAccount = "listreceivedbyaccount",
    ListReceivedByAddress = "listreceivedbyaddress",
    ListSinceBlock = "listsinceblock",
    ListTransactions = "listtransactions",
    ListUnspent = "listunspent",
    SendMany = "sendmany",
    SendToAddress = "sendtoaddress",
    SetAccount = "setaccount",
    SetGenerate = "setgenerate",
    SetTxFee = "settxfee",
    SignMessage = "signmessage",
    Stop = "stop",
    SubmitBlock = "submitblock",
    ValidateAddress = "validateaddress",
    VerifyMessage = "verifymessage",
    WalletLock = "walletlock",
    WalletPassphrase = "walletpassphrase",
    WalletPassphraseChange = "walletpassphrasechange"
}
export interface RpcMethodSpec<M extends RpcMethods> {
    method: M;
    params: any[];
    returnType: any;
    minParams: number;
    maxParams: number;
}
export type RpcMethodSpecs = {
    [M in RpcMethods]: RpcMethodSpec<M>;
} & {
    [key: string]: RpcMethodSpec<RpcMethods>;
};
export interface RpcMethodReturnTypes {
    [RpcMethods.GetBlock]: any;
    [RpcMethods.GetBlockchainInfo]: any;
}
export interface RpcRequest {
    method: string;
    params: any[];
}
export interface RpcResponse {
    result: any;
    error: any;
    id: string | number;
}
