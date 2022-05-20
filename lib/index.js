const http = require( 'http' );
const https = require( 'https' );
const url = require( 'url' );
const bsv = require( 'bsv' )

function decodeURL ( str ) {
  const parsedUrl = new url.URL( str );
  const hostname = parsedUrl.hostname;
  const port = parseInt( parsedUrl.port, 10 );
  let protocol = parsedUrl.protocol;
  // strip trailing ":"
  protocol = protocol.substring( 0, protocol.length - 1 );
  const user = parsedUrl.username;
  const pass = parsedUrl.password;
  const opts = {
    host: hostname,
    port: port,
    protocol: protocol,
    user: user,
    pass: pass,
  };
  return opts;
}

function RpcClient ( opts ) {
  // opts can ba an URL string
  if ( typeof opts === 'string' ) {
    opts = decodeURL( opts );
  }
  opts = opts || {};
  this.host = opts.host || '127.0.0.1';
  this.port = opts.port || 8332;
  this.user = opts.user || 'user';
  this.pass = opts.pass || 'pass';
  this.protocol = opts.protocol === 'http' ? http : https;
  this.batchedCalls = null;
  this.disableAgent = opts.disableAgent || false;

  const isRejectUnauthorized = typeof opts.rejectUnauthorized !== 'undefined';
  this.rejectUnauthorized = isRejectUnauthorized ? opts.rejectUnauthorized : true;

  if ( RpcClient.config.log ) {
    this.log = RpcClient.config.log;
  } else {
    this.log = RpcClient.loggers[ RpcClient.config.logger || 'normal' ];
  }

}

const cl = console.log.bind( console );

const noop = function () { };

RpcClient.loggers = {
  none: { info: noop, warn: noop, err: noop, debug: noop },
  normal: { info: cl, warn: cl, err: cl, debug: noop },
  debug: { info: cl, warn: cl, err: cl, debug: cl }
};

RpcClient.config = {
  logger: 'normal' // none, normal, debug
};

function rpc ( request, callback ) {

  const self = this;
  request = JSON.stringify( request );
  const auth = Buffer.from( self.user + ':' + self.pass ).toString( 'base64' );

  const options = {
    host: self.host,
    path: '/',
    method: 'POST',
    port: self.port,
    rejectUnauthorized: self.rejectUnauthorized,
    agent: self.disableAgent ? false : undefined
  };

  if ( self.httpOptions ) {
    for ( const k in self.httpOptions ) {
      options[ k ] = self.httpOptions[ k ];
    }
  }

  let called = false;

  const errorMessage = 'Bitcoin JSON-RPC: ';

  const req = this.protocol.request( options, function ( res ) {

    const bufferWriter = new bsv.encoding.BufferWriter()
    res.on( 'data', function ( data ) {
      bufferWriter.write( Buffer.from( data ) )
    } );

    res.on( 'end', function () {

      if ( called ) {
        return;
      }
      called = true;
      const buf = bufferWriter.toBuffer()

      if ( res.statusCode === 401 ) {
        callback( new Error( errorMessage + 'Connection Rejected: 401 Unnauthorized' ) );
        return;
      }
      if ( res.statusCode === 403 ) {
        callback( new Error( errorMessage + 'Connection Rejected: 403 Forbidden' ) );
        return;
      }
      if ( res.statusCode === 500 && buf.toString( 'utf8' ) === 'Work queue depth exceeded' ) {
        const exceededError = new Error( 'Bitcoin JSON-RPC: ' + bufferWriter.toBuffer().toString( 'utf8' ) );
        exceededError.code = 429; // Too many requests
        callback( exceededError );
        return;
      }

      let parsedBuf;
      try {
        parsedBuf = JSON.parse( buf );
      } catch ( e ) {
        self.log.err( e.stack );
        self.log.err( buf );
        self.log.err( 'HTTP Status code:' + res.statusCode );
        const err = new Error( errorMessage + 'Error Parsing JSON: ' + e.message );
        callback( err );
        return;
      }
      callback( parsedBuf.error, parsedBuf );

    } );
  } );

  req.on( 'error', function ( e ) {
    console.log( e )
    const err = new Error( errorMessage + 'Request Error: ' + e.message );
    if ( !called ) {
      called = true;
      callback( err );
    }
  } );

  req.setHeader( 'Content-Length', request.length );
  req.setHeader( 'Content-Type', 'application/json' );
  req.setHeader( 'Authorization', 'Basic ' + auth );
  req.write( request );
  req.end();
}

RpcClient.prototype.rest = function ( path, callback ) {
  return new Promise( ( resolve, reject ) => {

    const self = this;
    const auth = Buffer.from( self.user + ':' + self.pass ).toString( 'base64' );

    const options = {
      host: self.host,
      path: path,
      method: 'GET',
      port: self.port,
      rejectUnauthorized: self.rejectUnauthorized,
      agent: self.disableAgent ? false : undefined
    };

    if ( self.httpOptions ) {
      for ( const k in self.httpOptions ) {
        options[ k ] = self.httpOptions[ k ];
      }
    }

    let called = false;
    const errorMessage = 'Bitcoin JSON-RPC: ';

    const req = this.protocol.request( options, function ( res ) {
      //return response stream
      if ( callback ) callback( null, res );
      resolve( res );
    } );

    req.on( 'error', function ( e ) {
      console.log( e )
      const err = new Error( errorMessage + 'Request Error: ' + e.message );
      if ( !called ) {
        called = true;
        if ( callback ) callback( err );
        reject( err );
      }
    } );

    req.setHeader( 'Content-Type', 'application/json' );
    req.setHeader( 'Authorization', 'Basic ' + auth );
    req.end();
  } )
}

RpcClient.prototype.batch = function ( batchCallback, resultCallback ) {
  this.batchedCalls = [];
  batchCallback();
  rpc.call( this, this.batchedCalls, resultCallback );
  this.batchedCalls = null;
};

RpcClient.callspec = {
  abandonTransaction: 'str',
  abortRescan: '',
  addMultiSigAddress: '',
  addNode: '',
  analyzePSBT: 'str',
  backupWallet: '',
  bumpFee: 'str',
  clearBanned: '',
  combinePSBT: 'obj',
  combineRawTransaction: 'obj',
  convertToPSBT: 'str',
  createMultiSig: '',
  createPSBT: 'obj',
  createRawTransaction: 'obj obj',
  createWallet: 'str',
  decodePSBT: 'str',
  decodeScript: 'str',
  decodeRawTransaction: '',
  deriveAddresses: 'str',
  disconnectNode: '',
  dumpPrivKey: '',
  dumpWallet: 'str',
  encryptWallet: '',
  enumerateSigners: '',
  estimateSmartFee: 'int str',
  generate: 'int',
  generateBlock: 'str obj',
  generateToAddress: 'int str',
  generateToDescriptor: 'int str',
  getAddedNodeInfo: '',
  getAddressesByLabel: 'str',
  getAddressInfo: 'str',
  getBalance: 'str int',
  getBalances: '',
  getBestBlockHash: '',
  getBlock: 'str int',
  getBlockchainInfo: '',
  getBlockCount: '',
  getBlockFilter: 'str',
  getBlockHash: 'int',
  getBlockHeader: 'str',
  getBlockStats: 'str',
  getBlockTemplate: '',
  getConnectionCount: '',
  getChainTips: '',
  getChainTxStats: '',
  getDescriptorInfo: 'str',
  getDifficulty: '',
  getIndexInfo: '',
  getMemoryInfo: '',
  getMemPoolAncestors: 'str',
  getMemPoolDescendants: 'str',
  getMemPoolEntry: 'str',
  getMemPoolInfo: '',
  getMiningInfo: '',
  getNetTotals: '',
  getNetworkHashPS: '',
  getNetworkInfo: '',
  getNewAddress: 'str str',
  getNodeAddresses: '',
  getPeerInfo: '',
  getRawChangeAddress: '',
  getRawMemPool: 'bool',
  getRawTransaction: 'str int',
  getReceivedByAddress: 'str int',
  getReceivedByLabel: 'str',
  getRpcInfo: '',
  getSpentInfo: 'obj',
  getTransaction: '',
  getTxOut: 'str int bool',
  getTxOutProof: '',
  getTxOutSetInfo: '',
  getUnconfirmedBalance: '',
  getWalletInfo: '',
  getWork: '',
  getZmqNotifications: '',
  finalizePSBT: 'str',
  fundRawTransaction: 'str',
  help: '',
  importAddress: 'str str bool',
  importDescriptors: 'str',
  importMulti: 'obj obj',
  importPrivKey: 'str str bool',
  importPrunedFunds: 'str, str',
  importPubKey: 'str',
  importWallet: 'str',
  invalidateBlock: 'str',
  joinPSBTs: 'obj',
  keyPoolRefill: '',
  listAccounts: 'int',
  listAddressGroupings: '',
  listBanned: '',
  listDescriptors: '',
  listLabels: '',
  listLockUnspent: 'bool',
  listReceivedByAccount: 'int bool',
  listReceivedByAddress: 'int bool',
  listReceivedByLabel: '',
  listSinceBlock: 'str int',
  listTransactions: 'str int int',
  listUnspent: 'int int',
  listWalletDir: '',
  listWallets: '',
  loadWallet: 'str',
  lockUnspent: '',
  logging: '',
  move: 'str str float int str',
  ping: '',
  preciousBlock: 'str',
  prioritiseTransaction: 'str float int',
  pruneBlockChain: 'int',
  psbtBumpFee: 'str',
  removePrunedFunds: 'str',
  reScanBlockChain: '',
  saveMemPool: '',
  send: 'obj',
  setHDSeed: '',
  setLabel: 'str str',
  setWalletFlag: 'str',
  scanTxOutSet: 'str',
  sendFrom: 'str str float int str str',
  sendMany: 'str obj int str',  //not sure this is will work
  sendRawTransaction: 'str',
  sendRawTransactions: 'obj',
  sendToAddress: 'str float str str',
  setAccount: '',
  setBan: 'str str',
  setNetworkActive: 'bool',
  setGenerate: 'bool int',
  setTxFee: 'float',
  signMessage: '',
  signMessageWithPrivKey: 'str str',
  signRawTransaction: '',
  signRawTransactionWithKey: 'str obj',
  signRawTransactionWithWallet: 'str',
  stop: '',
  submitBlock: 'str',
  submitHeader: 'str',
  testMemPoolAccept: 'obj',
  unloadWallet: '',
  upgradeWallet: '',
  uptime: '',
  utxoUpdatePSBT: 'str',
  validateAddress: '',
  verifyChain: '',
  verifyMessage: '',
  verifyTxOutProof: 'str',
  walletCreateFundedPSBT: '',
  walletDisplayAddress: 'str',
  walletLock: '',
  walletPassPhrase: 'string int',
  walletPassphraseChange: '',
  walletProcessPSBT: 'str',
  getMerkleProof2: 'str',
  verifyMerkleProof: 'str',
  verifyScript: 'str',
  invalidateBlock: 'str',
  reconsiderBlock: 'str',
};

const slice = function ( arr, start, end ) {
  return Array.prototype.slice.call( arr, start, end );
};

function generateRPCMethods ( constructor, apiCalls, rpc ) {

  function createRPCMethod ( methodName, argMap ) {
    return function () {

      let limit = arguments.length - 1;

      if ( this.batchedCalls ) {
        limit = arguments.length;
      }

      for ( let i = 0; i < limit; i++ ) {
        if ( argMap[ i ] ) {
          arguments[ i ] = argMap[ i ]( arguments[ i ] );
        }
      }

      if ( this.batchedCalls ) {
        this.batchedCalls.push( {
          jsonrpc: '2.0',
          method: methodName,
          params: slice( arguments ),
          id: getRandomId()
        } );
      } else {
        return new Promise( ( resolve, reject ) => {
          const callback = ( typeof arguments[ arguments.length - 1 ] === 'function' ) ? arguments[ arguments.length - 1 ] : null;

          rpc.call( this, {
            method: methodName,
            params: callback ? slice( arguments, 0, arguments.length - 1 ) : slice( arguments ),
            id: getRandomId()
          }, ( err, res ) => {
            if ( callback ) callback( err, res );
            if ( err ) {
              reject( err );
            }
            else resolve( res.result );
          } );
        } )
      }

    };
  };

  const types = {
    str: function ( arg ) {
      return arg.toString();
    },
    int: function ( arg ) {
      return parseFloat( arg );
    },
    float: function ( arg ) {
      return parseFloat( arg );
    },
    bool: function ( arg ) {
      return ( arg === true || arg == '1' || arg == 'true' || arg.toString().toLowerCase() == 'true' );
    },
    obj: function ( arg ) {
      if ( typeof arg === 'string' ) {
        return JSON.parse( arg );
      }
      return arg;
    }
  };

  for ( let k in apiCalls ) {
    let spec = [];
    if ( apiCalls[ k ].length ) {
      spec = apiCalls[ k ].split( ' ' );
      for ( let i = 0; i < spec.length; i++ ) {
        if ( types[ spec[ i ] ] ) {
          spec[ i ] = types[ spec[ i ] ];
        } else {
          spec[ i ] = types.str;
        }
      }
    }
    const methodName = k.toLowerCase();
    constructor.prototype[ k ] = createRPCMethod( methodName, spec );
    constructor.prototype[ methodName ] = constructor.prototype[ k ];
  }

}

function getRandomId () {
  return parseInt( Math.random() * 100000 );
}

generateRPCMethods( RpcClient, RpcClient.callspec, rpc );

module.exports = RpcClient;
