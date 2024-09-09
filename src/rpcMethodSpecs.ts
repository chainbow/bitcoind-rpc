import { RpcMethodSpecs } from './types/RpcMethods';

enum RpcMethods {
  GetBlock = 'getblock',
  GetBlockchainInfo = 'getblockchaininfo',
  GetBlockHash = 'getblockhash',
  GetBlockCount = 'getblockcount',
  GetConnectionCount = 'getconnectioncount',
  GetInfo = 'getinfo',
  GetNewAddress = 'getnewaddress',
  GetPeerInfo = 'getpeerinfo',
  GetRawMempool = 'getrawmempool',
  GetRawTransaction = 'getrawtransaction',
  GetTxOut = 'gettxout',
  GetWork = 'getwork',
  Help = 'help',
  ImportPrivKey = 'importprivkey',
  KeyPoolRefill = 'keypoolrefill',
  ListAccounts = 'listaccounts',
  ListReceivedByAccount = 'listreceivedbyaccount',
  ListReceivedByAddress = 'listreceivedbyaddress',
  ListSinceBlock = 'listsinceblock',
  ListTransactions = 'listtransactions',
  ListUnspent = 'listunspent',
  SendMany = 'sendmany',
  SendToAddress = 'sendtoaddress',
  SetAccount = 'setaccount',
  SetGenerate = 'setgenerate',
  SetTxFee = 'settxfee',
  SignMessage = 'signmessage',
  Stop = 'stop',
  SubmitBlock = 'submitblock',
  ValidateAddress = 'validateaddress',
  VerifyMessage = 'verifymessage',
  WalletLock = 'walletlock',
  WalletPassphrase = 'walletpassphrase',
  WalletPassphraseChange = 'walletpassphrasechange'
}

type RpcMethodParams = {
  [RpcMethods.GetBlock]: [blockhash: string, verbosity?: number];
  [RpcMethods.GetBlockchainInfo]: [];
  [RpcMethods.GetBlockHash]: [height: number];
  [RpcMethods.GetBlockCount]: [];
  [RpcMethods.GetConnectionCount]: [];
  [RpcMethods.GetInfo]: [];
  [RpcMethods.GetNewAddress]: [account?: string];
  [RpcMethods.GetPeerInfo]: [];
  [RpcMethods.GetRawMempool]: [verbose?: boolean];
  [RpcMethods.GetRawTransaction]: [txid: string, verbose?: number];
  [RpcMethods.GetTxOut]: [txid: string, n: number, includemempool?: boolean];
  [RpcMethods.GetWork]: [data?: string];
  [RpcMethods.Help]: [command?: string];
  [RpcMethods.ImportPrivKey]: [bitcoinprivkey: string, label?: string, rescan?: boolean];
  [RpcMethods.KeyPoolRefill]: [];
  [RpcMethods.ListAccounts]: [minconf?: number, includewatchonly?: boolean];
  [RpcMethods.ListReceivedByAccount]: [minconf?: number, includeempty?: boolean, includewatchonly?: boolean];
  [RpcMethods.ListReceivedByAddress]: [minconf?: number, includeempty?: boolean, includewatchonly?: boolean];
  [RpcMethods.ListSinceBlock]: [blockhash?: string, targetconfirmations?: number, includewatchonly?: boolean];
  [RpcMethods.ListTransactions]: [account?: string, count?: number, skip?: number, includewatchonly?: boolean];
  [RpcMethods.ListUnspent]: [minconf?: number, maxconf?: number, addresses?: string[]];
  [RpcMethods.SendMany]: [fromaccount: string, amounts: { [address: string]: number }, minconf?: number, comment?: string];
  [RpcMethods.SendToAddress]: [bitcoinaddress: string, amount: number, comment?: string, commentTo?: string, subtractfeefromamount?: boolean];
  [RpcMethods.SetAccount]: [bitcoinaddress: string, account: string];
  [RpcMethods.SetGenerate]: [generate: boolean, genproclimit?: number];
  [RpcMethods.SetTxFee]: [amount: number];
  [RpcMethods.SignMessage]: [bitcoinaddress: string, message: string];
  [RpcMethods.Stop]: [];
  [RpcMethods.SubmitBlock]: [hexdata: string, parameters?: { [key: string]: any }];
  [RpcMethods.ValidateAddress]: [bitcoinaddress: string];
  [RpcMethods.VerifyMessage]: [bitcoinaddress: string, signature: string, message: string];
  [RpcMethods.WalletLock]: [];
  [RpcMethods.WalletPassphrase]: [passphrase: string, timeout: number];
  [RpcMethods.WalletPassphraseChange]: [oldpassphrase: string, newpassphrase: string];
}

type RpcMethodReturnTypes = {
  [RpcMethods.GetBlock]: { /* 定义返回类型 */ };
  [RpcMethods.GetBlockchainInfo]: { /* 定义返回类型 */ };
  [RpcMethods.GetBlockHash]: string;
  [RpcMethods.GetBlockCount]: number;
  [RpcMethods.GetConnectionCount]: number;
  [RpcMethods.GetInfo]: { /* 定义返回类型 */ };
  [RpcMethods.GetNewAddress]: string;
  [RpcMethods.GetPeerInfo]: { /* 定义返回类型 */ }[];
  [RpcMethods.GetRawMempool]: { /* 定义返回类型 */ }[];
  [RpcMethods.GetRawTransaction]: { /* 定义返回类型 */ };
  [RpcMethods.GetTxOut]: { /* 定义返回类型 */ };
  [RpcMethods.GetWork]: { /* 定义返回类型 */ };
  [RpcMethods.Help]: string;
  [RpcMethods.ImportPrivKey]: string;
  [RpcMethods.KeyPoolRefill]: void;
  [RpcMethods.ListAccounts]: { [account: string]: number };
  [RpcMethods.ListReceivedByAccount]: { /* 定义返回类型 */ }[];
  [RpcMethods.ListReceivedByAddress]: { /* 定义返回类型 */ }[];
  [RpcMethods.ListSinceBlock]: { /* 定义返回类型 */ };
  [RpcMethods.ListTransactions]: { /* 定义返回类型 */ }[];
  [RpcMethods.ListUnspent]: { /* 定义返回类型 */ }[];
  [RpcMethods.SendMany]: string;
  [RpcMethods.SendToAddress]: string;
  [RpcMethods.SetAccount]: void;
  [RpcMethods.SetGenerate]: void;
  [RpcMethods.SetTxFee]: boolean;
  [RpcMethods.SignMessage]: string;
  [RpcMethods.Stop]: void;
  [RpcMethods.SubmitBlock]: void;
  [RpcMethods.ValidateAddress]: { /* 定义返回类型 */ };
  [RpcMethods.VerifyMessage]: boolean;
  [RpcMethods.WalletLock]: void;
  [RpcMethods.WalletPassphrase]: void;
  [RpcMethods.WalletPassphraseChange]: void;
}

type RpcMethodSpec<M extends RpcMethods> = {
  method: M;
  params: RpcMethodParams[M];
  returnType: RpcMethodReturnTypes[M];
  minParams: number;
  maxParams: number;
}

const rpcMethodSpecs: RpcMethodSpecs = {
  [RpcMethods.GetBlock]: {
    method: RpcMethods.GetBlock,
    params: [] as unknown as [string, (number | undefined)?],
    returnType: {} as any,
    minParams: 1,
    maxParams: 2
  },
  [RpcMethods.GetBlockchainInfo]: {
    method: RpcMethods.GetBlockchainInfo,
    params: [] as unknown as [],
    returnType: {} as any,
    minParams: 0,
    maxParams: 0
  },
  [RpcMethods.GetBlockHash]: {
    method: RpcMethods.GetBlockHash,
    params: [] as unknown as [number],
    returnType: '' as RpcMethodReturnTypes[RpcMethods.GetBlockHash],
    minParams: 1,
    maxParams: 1
  },
  [RpcMethods.GetBlockCount]: {
    method: RpcMethods.GetBlockCount,
    params: [] as unknown as [],
    returnType: 0 as RpcMethodReturnTypes[RpcMethods.GetBlockCount],
    minParams: 0,
    maxParams: 0
  },
  [RpcMethods.GetConnectionCount]: {
    method: RpcMethods.GetConnectionCount,
    params: [] as unknown as [],
    returnType: 0 as RpcMethodReturnTypes[RpcMethods.GetConnectionCount],
    minParams: 0,
    maxParams: 0
  },
  [RpcMethods.GetInfo]: {
    method: RpcMethods.GetInfo,
    params: [] as unknown as [],
    returnType: {} as RpcMethodReturnTypes[RpcMethods.GetInfo],
    minParams: 0,
    maxParams: 0
  },
  [RpcMethods.GetNewAddress]: {
    method: RpcMethods.GetNewAddress,
    params: [] as unknown as [string?],
    returnType: '' as RpcMethodReturnTypes[RpcMethods.GetNewAddress],
    minParams: 0,
    maxParams: 1
  },
  [RpcMethods.GetPeerInfo]: {
    method: RpcMethods.GetPeerInfo,
    params: [] as unknown as [],
    returnType: [] as RpcMethodReturnTypes[RpcMethods.GetPeerInfo],
    minParams: 0,
    maxParams: 0
  },
  [RpcMethods.GetRawMempool]: {
    method: RpcMethods.GetRawMempool,
    params: [] as unknown as [boolean?],
    returnType: [] as RpcMethodReturnTypes[RpcMethods.GetRawMempool],
    minParams: 0,
    maxParams: 1
  },
  [RpcMethods.GetRawTransaction]: {
    method: RpcMethods.GetRawTransaction,
    params: [] as unknown as [string, number?],
    returnType: {} as RpcMethodReturnTypes[RpcMethods.GetRawTransaction],
    minParams: 1,
    maxParams: 2
  },
  [RpcMethods.GetTxOut]: {
    method: RpcMethods.GetTxOut,
    params: [] as unknown as [string, number, boolean?],
    returnType: {} as RpcMethodReturnTypes[RpcMethods.GetTxOut],
    minParams: 2,
    maxParams: 3
  },
  [RpcMethods.GetWork]: {
    method: RpcMethods.GetWork,
    params: [] as unknown as [string?],
    returnType: {} as RpcMethodReturnTypes[RpcMethods.GetWork],
    minParams: 0,
    maxParams: 1
  },
  [RpcMethods.Help]: {
    method: RpcMethods.Help,
    params: [] as unknown as [string?],
    returnType: '' as RpcMethodReturnTypes[RpcMethods.Help],
    minParams: 0,
    maxParams: 1
  },
  [RpcMethods.ImportPrivKey]: {
    method: RpcMethods.ImportPrivKey,
    params: [] as unknown as [string, string?, boolean?],
    returnType: '' as RpcMethodReturnTypes[RpcMethods.ImportPrivKey],
    minParams: 1,
    maxParams: 3
  },
  [RpcMethods.KeyPoolRefill]: {
    method: RpcMethods.KeyPoolRefill,
    params: [] as unknown as [],
    returnType: undefined as RpcMethodReturnTypes[RpcMethods.KeyPoolRefill],
    minParams: 0,
    maxParams: 0
  },
  [RpcMethods.ListAccounts]: {
    method: RpcMethods.ListAccounts,
    params: [] as unknown as [number?, boolean?],
    returnType: {} as RpcMethodReturnTypes[RpcMethods.ListAccounts],
    minParams: 0,
    maxParams: 2
  },
  [RpcMethods.ListReceivedByAccount]: {
    method: RpcMethods.ListReceivedByAccount,
    params: [] as unknown as [number?, boolean?, boolean?],
    returnType: [] as RpcMethodReturnTypes[RpcMethods.ListReceivedByAccount],
    minParams: 0,
    maxParams: 3
  },
  [RpcMethods.ListReceivedByAddress]: {
    method: RpcMethods.ListReceivedByAddress,
    params: [] as unknown as [number?, boolean?, boolean?],
    returnType: [] as RpcMethodReturnTypes[RpcMethods.ListReceivedByAddress],
    minParams: 0,
    maxParams: 3
  },
  [RpcMethods.ListSinceBlock]: {
    method: RpcMethods.ListSinceBlock,
    params: [] as unknown as [string?, number?, boolean?],
    returnType: {} as RpcMethodReturnTypes[RpcMethods.ListSinceBlock],
    minParams: 0,
    maxParams: 3
  },
  [RpcMethods.ListTransactions]: {
    method: RpcMethods.ListTransactions,
    params: [] as unknown as [string?, number?, number?, boolean?],
    returnType: [] as RpcMethodReturnTypes[RpcMethods.ListTransactions],
    minParams: 0,
    maxParams: 4
  },
  [RpcMethods.ListUnspent]: {
    method: RpcMethods.ListUnspent,
    params: [] as unknown as [number?, number?, string[]?],
    returnType: [] as RpcMethodReturnTypes[RpcMethods.ListUnspent],
    minParams: 0,
    maxParams: 3
  },
  [RpcMethods.SendMany]: {
    method: RpcMethods.SendMany,
    params: [] as unknown as [string, { [address: string]: number }, number?, string?],
    returnType: '' as RpcMethodReturnTypes[RpcMethods.SendMany],
    minParams: 2,
    maxParams: 4
  },
  [RpcMethods.SendToAddress]: {
    method: RpcMethods.SendToAddress,
    params: [] as unknown as [string, number, string?, string?, boolean?],
    returnType: '' as RpcMethodReturnTypes[RpcMethods.SendToAddress],
    minParams: 2,
    maxParams: 5
  },
  [RpcMethods.SetAccount]: {
    method: RpcMethods.SetAccount,
    params: [] as unknown as [string, string],
    returnType: undefined as RpcMethodReturnTypes[RpcMethods.SetAccount],
    minParams: 2,
    maxParams: 2
  },
  [RpcMethods.SetGenerate]: {
    method: RpcMethods.SetGenerate,
    params: [] as unknown as [boolean, number?],
    returnType: undefined as RpcMethodReturnTypes[RpcMethods.SetGenerate],
    minParams: 1,
    maxParams: 2
  },
  [RpcMethods.SetTxFee]: {
    method: RpcMethods.SetTxFee,
    params: [] as unknown as [number],
    returnType: true as RpcMethodReturnTypes[RpcMethods.SetTxFee],
    minParams: 1,
    maxParams: 1
  },
  [RpcMethods.SignMessage]: {
    method: RpcMethods.SignMessage,
    params: [] as unknown as [string, string],
    returnType: '' as RpcMethodReturnTypes[RpcMethods.SignMessage],
    minParams: 2,
    maxParams: 2
  },
  [RpcMethods.Stop]: {
    method: RpcMethods.Stop,
    params: [] as unknown as [],
    returnType: undefined as RpcMethodReturnTypes[RpcMethods.Stop],
    minParams: 0,
    maxParams: 0
  },
  [RpcMethods.SubmitBlock]: {
    method: RpcMethods.SubmitBlock,
    params: [] as unknown as [string, { [key: string]: any }?],
    returnType: undefined as RpcMethodReturnTypes[RpcMethods.SubmitBlock],
    minParams: 1,
    maxParams: 2
  },
  [RpcMethods.ValidateAddress]: {
    method: RpcMethods.ValidateAddress,
    params: [] as unknown as [string],
    returnType: {} as RpcMethodReturnTypes[RpcMethods.ValidateAddress],
    minParams: 1,
    maxParams: 1
  },
  [RpcMethods.VerifyMessage]: {
    method: RpcMethods.VerifyMessage,
    params: [] as unknown as [string, string, string],
    returnType: true as RpcMethodReturnTypes[RpcMethods.VerifyMessage],
    minParams: 3,
    maxParams: 3
  },
  [RpcMethods.WalletLock]: {
    method: RpcMethods.WalletLock,
    params: [] as unknown as [],
    returnType: undefined as RpcMethodReturnTypes[RpcMethods.WalletLock],
    minParams: 0,
    maxParams: 0
  },
  [RpcMethods.WalletPassphrase]: {
    method: RpcMethods.WalletPassphrase,
    params: [] as unknown as [string, number],
    returnType: undefined as RpcMethodReturnTypes[RpcMethods.WalletPassphrase],
    minParams: 2,
    maxParams: 2
  },
  [RpcMethods.WalletPassphraseChange]: {
    method: RpcMethods.WalletPassphraseChange,
    params: [] as unknown as [string, string],
    returnType: undefined as RpcMethodReturnTypes[RpcMethods.WalletPassphraseChange],
    minParams: 2,
    maxParams: 2
  }
};

export { RpcMethods, rpcMethodSpecs };