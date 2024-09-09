"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
const rpcMethodSpecs = {
    [RpcMethods.GetBlock]: {
        method: RpcMethods.GetBlock,
        params: [],
        returnType: {},
        minParams: 1,
        maxParams: 2
    },
    [RpcMethods.GetBlockchainInfo]: {
        method: RpcMethods.GetBlockchainInfo,
        params: [],
        returnType: {},
        minParams: 0,
        maxParams: 0
    },
    [RpcMethods.GetBlockHash]: {
        method: RpcMethods.GetBlockHash,
        params: [],
        returnType: '',
        minParams: 1,
        maxParams: 1
    },
    [RpcMethods.GetBlockCount]: {
        method: RpcMethods.GetBlockCount,
        params: [],
        returnType: 0,
        minParams: 0,
        maxParams: 0
    },
    [RpcMethods.GetConnectionCount]: {
        method: RpcMethods.GetConnectionCount,
        params: [],
        returnType: 0,
        minParams: 0,
        maxParams: 0
    },
    [RpcMethods.GetInfo]: {
        method: RpcMethods.GetInfo,
        params: [],
        returnType: {},
        minParams: 0,
        maxParams: 0
    },
    [RpcMethods.GetNewAddress]: {
        method: RpcMethods.GetNewAddress,
        params: [],
        returnType: '',
        minParams: 0,
        maxParams: 1
    },
    [RpcMethods.GetPeerInfo]: {
        method: RpcMethods.GetPeerInfo,
        params: [],
        returnType: [],
        minParams: 0,
        maxParams: 0
    },
    [RpcMethods.GetRawMempool]: {
        method: RpcMethods.GetRawMempool,
        params: [],
        returnType: [],
        minParams: 0,
        maxParams: 1
    },
    [RpcMethods.GetRawTransaction]: {
        method: RpcMethods.GetRawTransaction,
        params: [],
        returnType: {},
        minParams: 1,
        maxParams: 2
    },
    [RpcMethods.GetTxOut]: {
        method: RpcMethods.GetTxOut,
        params: [],
        returnType: {},
        minParams: 2,
        maxParams: 3
    },
    [RpcMethods.GetWork]: {
        method: RpcMethods.GetWork,
        params: [],
        returnType: {},
        minParams: 0,
        maxParams: 1
    },
    [RpcMethods.Help]: {
        method: RpcMethods.Help,
        params: [],
        returnType: '',
        minParams: 0,
        maxParams: 1
    },
    [RpcMethods.ImportPrivKey]: {
        method: RpcMethods.ImportPrivKey,
        params: [],
        returnType: '',
        minParams: 1,
        maxParams: 3
    },
    [RpcMethods.KeyPoolRefill]: {
        method: RpcMethods.KeyPoolRefill,
        params: [],
        returnType: undefined,
        minParams: 0,
        maxParams: 0
    },
    [RpcMethods.ListAccounts]: {
        method: RpcMethods.ListAccounts,
        params: [],
        returnType: {},
        minParams: 0,
        maxParams: 2
    },
    [RpcMethods.ListReceivedByAccount]: {
        method: RpcMethods.ListReceivedByAccount,
        params: [],
        returnType: [],
        minParams: 0,
        maxParams: 3
    },
    [RpcMethods.ListReceivedByAddress]: {
        method: RpcMethods.ListReceivedByAddress,
        params: [],
        returnType: [],
        minParams: 0,
        maxParams: 3
    },
    [RpcMethods.ListSinceBlock]: {
        method: RpcMethods.ListSinceBlock,
        params: [],
        returnType: {},
        minParams: 0,
        maxParams: 3
    },
    [RpcMethods.ListTransactions]: {
        method: RpcMethods.ListTransactions,
        params: [],
        returnType: [],
        minParams: 0,
        maxParams: 4
    },
    [RpcMethods.ListUnspent]: {
        method: RpcMethods.ListUnspent,
        params: [],
        returnType: [],
        minParams: 0,
        maxParams: 3
    },
    [RpcMethods.SendMany]: {
        method: RpcMethods.SendMany,
        params: [],
        returnType: '',
        minParams: 2,
        maxParams: 4
    },
    [RpcMethods.SendToAddress]: {
        method: RpcMethods.SendToAddress,
        params: [],
        returnType: '',
        minParams: 2,
        maxParams: 5
    },
    [RpcMethods.SetAccount]: {
        method: RpcMethods.SetAccount,
        params: [],
        returnType: undefined,
        minParams: 2,
        maxParams: 2
    },
    [RpcMethods.SetGenerate]: {
        method: RpcMethods.SetGenerate,
        params: [],
        returnType: undefined,
        minParams: 1,
        maxParams: 2
    },
    [RpcMethods.SetTxFee]: {
        method: RpcMethods.SetTxFee,
        params: [],
        returnType: true,
        minParams: 1,
        maxParams: 1
    },
    [RpcMethods.SignMessage]: {
        method: RpcMethods.SignMessage,
        params: [],
        returnType: '',
        minParams: 2,
        maxParams: 2
    },
    [RpcMethods.Stop]: {
        method: RpcMethods.Stop,
        params: [],
        returnType: undefined,
        minParams: 0,
        maxParams: 0
    },
    [RpcMethods.SubmitBlock]: {
        method: RpcMethods.SubmitBlock,
        params: [],
        returnType: undefined,
        minParams: 1,
        maxParams: 2
    },
    [RpcMethods.ValidateAddress]: {
        method: RpcMethods.ValidateAddress,
        params: [],
        returnType: {},
        minParams: 1,
        maxParams: 1
    },
    [RpcMethods.VerifyMessage]: {
        method: RpcMethods.VerifyMessage,
        params: [],
        returnType: true,
        minParams: 3,
        maxParams: 3
    },
    [RpcMethods.WalletLock]: {
        method: RpcMethods.WalletLock,
        params: [],
        returnType: undefined,
        minParams: 0,
        maxParams: 0
    },
    [RpcMethods.WalletPassphrase]: {
        method: RpcMethods.WalletPassphrase,
        params: [],
        returnType: undefined,
        minParams: 2,
        maxParams: 2
    },
    [RpcMethods.WalletPassphraseChange]: {
        method: RpcMethods.WalletPassphraseChange,
        params: [],
        returnType: undefined,
        minParams: 2,
        maxParams: 2
    }
};
exports.rpcMethodSpecs = rpcMethodSpecs;
