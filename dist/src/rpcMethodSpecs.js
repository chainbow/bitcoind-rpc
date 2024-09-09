"use strict";
var _a;
exports.__esModule = true;
exports.rpcMethodSpecs = exports.RpcMethods = void 0;
var RpcMethods;
(function (RpcMethods) {
    RpcMethods["GetBlock"] = "getblock";
    RpcMethods["GetBlockchainInfo"] = "getblockchaininfo";
    RpcMethods["GetBlockHash"] = "getblockhash";
    RpcMethods["GetBlockCount"] = "getblockcount";
    RpcMethods["GetConnectionCount"] = "getconnectioncount";
    RpcMethods["GetInfo"] = "getinfo";
    RpcMethods["GetNewAddress"] = "getnewaddress";
    RpcMethods["GetPeerInfo"] = "getpeerinfo";
    RpcMethods["GetRawMempool"] = "getrawmempool";
    RpcMethods["GetRawTransaction"] = "getrawtransaction";
    RpcMethods["GetTxOut"] = "gettxout";
    RpcMethods["GetWork"] = "getwork";
    RpcMethods["Help"] = "help";
    RpcMethods["ImportPrivKey"] = "importprivkey";
    RpcMethods["KeyPoolRefill"] = "keypoolrefill";
    RpcMethods["ListAccounts"] = "listaccounts";
    RpcMethods["ListReceivedByAccount"] = "listreceivedbyaccount";
    RpcMethods["ListReceivedByAddress"] = "listreceivedbyaddress";
    RpcMethods["ListSinceBlock"] = "listsinceblock";
    RpcMethods["ListTransactions"] = "listtransactions";
    RpcMethods["ListUnspent"] = "listunspent";
    RpcMethods["SendMany"] = "sendmany";
    RpcMethods["SendToAddress"] = "sendtoaddress";
    RpcMethods["SetAccount"] = "setaccount";
    RpcMethods["SetGenerate"] = "setgenerate";
    RpcMethods["SetTxFee"] = "settxfee";
    RpcMethods["SignMessage"] = "signmessage";
    RpcMethods["Stop"] = "stop";
    RpcMethods["SubmitBlock"] = "submitblock";
    RpcMethods["ValidateAddress"] = "validateaddress";
    RpcMethods["VerifyMessage"] = "verifymessage";
    RpcMethods["WalletLock"] = "walletlock";
    RpcMethods["WalletPassphrase"] = "walletpassphrase";
    RpcMethods["WalletPassphraseChange"] = "walletpassphrasechange";
})(RpcMethods || (RpcMethods = {}));
exports.RpcMethods = RpcMethods;
var rpcMethodSpecs = (_a = {},
    _a[RpcMethods.GetBlock] = {
        method: RpcMethods.GetBlock,
        params: [],
        returnType: {}
    },
    _a[RpcMethods.GetBlockchainInfo] = {
        method: RpcMethods.GetBlockchainInfo,
        params: [],
        returnType: {}
    },
    _a[RpcMethods.GetBlockHash] = {
        method: RpcMethods.GetBlockHash,
        params: [],
        returnType: ''
    },
    _a[RpcMethods.GetBlockCount] = {
        method: RpcMethods.GetBlockCount,
        params: [],
        returnType: 0
    },
    _a[RpcMethods.GetConnectionCount] = {
        method: RpcMethods.GetConnectionCount,
        params: [],
        returnType: 0
    },
    _a[RpcMethods.GetInfo] = {
        method: RpcMethods.GetInfo,
        params: [],
        returnType: {}
    },
    _a[RpcMethods.GetNewAddress] = {
        method: RpcMethods.GetNewAddress,
        params: [],
        returnType: ''
    },
    _a[RpcMethods.GetPeerInfo] = {
        method: RpcMethods.GetPeerInfo,
        params: [],
        returnType: []
    },
    _a[RpcMethods.GetRawMempool] = {
        method: RpcMethods.GetRawMempool,
        params: [],
        returnType: []
    },
    _a[RpcMethods.GetRawTransaction] = {
        method: RpcMethods.GetRawTransaction,
        params: [],
        returnType: {}
    },
    _a[RpcMethods.GetTxOut] = {
        method: RpcMethods.GetTxOut,
        params: [],
        returnType: {}
    },
    _a[RpcMethods.GetWork] = {
        method: RpcMethods.GetWork,
        params: [],
        returnType: {}
    },
    _a[RpcMethods.Help] = {
        method: RpcMethods.Help,
        params: [],
        returnType: ''
    },
    _a[RpcMethods.ImportPrivKey] = {
        method: RpcMethods.ImportPrivKey,
        params: [],
        returnType: ''
    },
    _a[RpcMethods.KeyPoolRefill] = {
        method: RpcMethods.KeyPoolRefill,
        params: [],
        returnType: undefined
    },
    _a[RpcMethods.ListAccounts] = {
        method: RpcMethods.ListAccounts,
        params: [],
        returnType: {}
    },
    _a[RpcMethods.ListReceivedByAccount] = {
        method: RpcMethods.ListReceivedByAccount,
        params: [],
        returnType: []
    },
    _a[RpcMethods.ListReceivedByAddress] = {
        method: RpcMethods.ListReceivedByAddress,
        params: [],
        returnType: []
    },
    _a[RpcMethods.ListSinceBlock] = {
        method: RpcMethods.ListSinceBlock,
        params: [],
        returnType: {}
    },
    _a[RpcMethods.ListTransactions] = {
        method: RpcMethods.ListTransactions,
        params: [],
        returnType: []
    },
    _a[RpcMethods.ListUnspent] = {
        method: RpcMethods.ListUnspent,
        params: [],
        returnType: []
    },
    _a[RpcMethods.SendMany] = {
        method: RpcMethods.SendMany,
        params: [],
        returnType: ''
    },
    _a[RpcMethods.SendToAddress] = {
        method: RpcMethods.SendToAddress,
        params: [],
        returnType: ''
    },
    _a[RpcMethods.SetAccount] = {
        method: RpcMethods.SetAccount,
        params: [],
        returnType: undefined
    },
    _a[RpcMethods.SetGenerate] = {
        method: RpcMethods.SetGenerate,
        params: [],
        returnType: undefined
    },
    _a[RpcMethods.SetTxFee] = {
        method: RpcMethods.SetTxFee,
        params: [],
        returnType: true
    },
    _a[RpcMethods.SignMessage] = {
        method: RpcMethods.SignMessage,
        params: [],
        returnType: ''
    },
    _a[RpcMethods.Stop] = {
        method: RpcMethods.Stop,
        params: [],
        returnType: undefined
    },
    _a[RpcMethods.SubmitBlock] = {
        method: RpcMethods.SubmitBlock,
        params: [],
        returnType: undefined
    },
    _a[RpcMethods.ValidateAddress] = {
        method: RpcMethods.ValidateAddress,
        params: [],
        returnType: {}
    },
    _a[RpcMethods.VerifyMessage] = {
        method: RpcMethods.VerifyMessage,
        params: [],
        returnType: true
    },
    _a[RpcMethods.WalletLock] = {
        method: RpcMethods.WalletLock,
        params: [],
        returnType: undefined
    },
    _a[RpcMethods.WalletPassphrase] = {
        method: RpcMethods.WalletPassphrase,
        params: [],
        returnType: undefined
    },
    _a[RpcMethods.WalletPassphraseChange] = {
        method: RpcMethods.WalletPassphraseChange,
        params: [],
        returnType: undefined
    },
    _a);
exports.rpcMethodSpecs = rpcMethodSpecs;
