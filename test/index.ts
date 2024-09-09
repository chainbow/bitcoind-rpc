import 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import RpcClient from '../src/RpcClient';
import { RpcClientOptions } from '../src/types/RpcClientOptions';
import { EventEmitter } from 'events';
import http from 'http';
import https from 'https';

describe('RpcClient', function () {
  let client: RpcClient;
  let requestStub: sinon.SinonStub;

  beforeEach(function () {
    const options: RpcClientOptions = {
      protocol: 'http',
      host: 'localhost',
      port: 8332,
      user: 'user',
      pass: 'pass',
    };
    client = new RpcClient(options);
  });

  afterEach(function () {
    if (requestStub && requestStub.restore) {
      requestStub.restore();
    }
  });

  it('should initialize the main object', function () {
    expect(RpcClient).to.exist;
  });

  it('should be able to create instance', function () {
    expect(client).to.be.instanceof(RpcClient);
  });

  it('default to rejectUnauthorized as true', function () {
    expect((client as any).rejectUnauthorized).to.equal(true);
  });

  it('should use https', function () {
    const secureClient = new RpcClient({
      user: 'user',
      pass: 'pass',
      port: 8332,
      protocol: 'https'
    });
    expect((secureClient as any).protocol).to.equal(https);
  });
  it('should use http', function () {
    const httpClient = new RpcClient({
      user: 'user',
      pass: 'pass',
      host: 'localhost',
      port: 8332,
      protocol: 'http'
    });
    expect((httpClient as any).protocol).to.equal(http);
  });

  it('should accept URL', function () {
    const urlClient = new RpcClient('http://user:pass@localhost:8332');
    expect((urlClient as any).host).to.equal('localhost');
    expect((urlClient as any).port).to.equal(8332);
    expect((urlClient as any).user).to.equal('user');
    expect((urlClient as any).pass).to.equal('pass');
    expect((urlClient as any).protocol).to.equal(http);
  });
/*
  it('should call a method and receive response', async function () {
    requestStub = sinon.stub(client['protocol'], 'request').callsFake((options, callback) => {
      const res = new EventEmitter() as any;
      res.statusCode = 200;
      setImmediate(() => {
        res.emit('data', '{"result":true}');
        res.emit('end');
      });
      callback(res);
      return { end: () => {} } as any;
    });

    const result = await (client as any).setTxFee(0.01);
    expect(result).to.be.true;
  });

  it('should accept many values for bool', async function () {
    requestStub = sinon.stub(client['protocol'], 'request').callsFake((options, callback) => {
      const res = new EventEmitter() as any;
      res.statusCode = 200;
      setImmediate(() => {
        res.emit('data', '{"result":true}');
        res.emit('end');
      });
      callback(res);
      return { end: () => {} } as any;
    });

    const booleanValues = [true, 'true', 1, '1', 'True'];
    for (const boolValue of booleanValues) {
      const result = await (client as any).importAddress('address', '', boolValue);
      expect(result).to.be.true;
    }
  });

  it('should process object arguments', async function () {
    requestStub = sinon.stub(client['protocol'], 'request').callsFake((options, callback) => {
      const res = new EventEmitter() as any;
      res.statusCode = 200;
      setImmediate(() => {
        res.emit('data', '{"result":true}');
        res.emit('end');
      });
      callback(res);
      return { end: () => {} } as any;
    });

    const address = 'n28S35tqEMbt6vNad7A5K3mZ7vdn8dZ86X';
    const objects = [{ [address]: 1 }, JSON.stringify({ [address]: 1 })];
    for (const obj of objects) {
      const result = await (client as any).sendMany('account', obj);
      expect(result).to.be.true;
    }
  });

  it('should handle connection rejected 401 unauthorized', async function () {
    requestStub = sinon.stub(client['protocol'], 'request').callsFake((options, callback) => {
      const res = new EventEmitter() as any;
      res.statusCode = 401;
      setImmediate(() => {
        res.emit('end');
      });
      callback(res);
      return { end: () => {} } as any;
    });

    try {
      await (client as any).getBalance('n28S35tqEMbt6vNad7A5K3mZ7vdn8dZ86X', 6);
      expect.fail('Should have thrown an error');
    } catch (error: any) {
      expect(error.message).to.equal('Bitcoin JSON-RPC: Connection Rejected: 401 Unauthorized');
    }
  });

  it('should handle connection rejected 403 forbidden', async function () {
    requestStub = sinon.stub(client['protocol'], 'request').callsFake((options, callback) => {
      const res = new EventEmitter() as any;
      res.statusCode = 403;
      setImmediate(() => {
        res.emit('end');
      });
      callback(res);
      return { end: () => {} } as any;
    });

    try {
      await (client as any).getDifficulty();
      expect.fail('Should have thrown an error');
    } catch (error: any) {
      expect(error.message).to.equal('Bitcoin JSON-RPC: Connection Rejected: 403 Forbidden');
    }
  });

  it('should handle 500 work limit exceeded error', async function () {
    requestStub = sinon.stub(client['protocol'], 'request').callsFake((options, callback) => {
      const res = new EventEmitter() as any;
      res.statusCode = 500;
      setImmediate(() => {
        res.emit('data', 'Work queue depth exceeded');
        res.emit('end');
      });
      callback(res);
      return { end: () => {} } as any;
    });

    try {
      await (client as any).getDifficulty();
      expect.fail('Should have thrown an error');
    } catch (error: any) {
      expect(error.message).to.equal('Bitcoin JSON-RPC: Work queue depth exceeded');
    }
  });

  it('should handle EPIPE error case 1', async function () {
    requestStub = sinon.stub(client['protocol'], 'request').callsFake(() => {
      const req = new EventEmitter() as any;
      setImmediate(() => {
        req.emit('error', new Error('write EPIPE'));
      });
      return req;
    });

    try {
      await (client as any).getDifficulty();
      expect.fail('Should have thrown an error');
    } catch (error: any) {
      expect(error.message).to.equal('Bitcoin JSON-RPC: Request Error: write EPIPE');
    }
  });

  it('should handle ECONNREFUSED error case 1', async function () {
    requestStub = sinon.stub(client['protocol'], 'request').callsFake(() => {
      const req = new EventEmitter() as any;
      setImmediate(() => {
        req.emit('error', new Error('connect ECONNREFUSED'));
      });
      return req;
    });

    try {
      await (client as any).getDifficulty();
      expect.fail('Should have thrown an error');
    } catch (error: any) {
      expect(error.message).to.equal('Bitcoin JSON-RPC: Request Error: connect ECONNREFUSED');
    }
  });

  it('should handle ECONNREFUSED error case 2', async function () {
    requestStub = sinon.stub(client['protocol'], 'request').callsFake(() => {
      const req = new EventEmitter() as any;
      setImmediate(() => {
        req.emit('error', { code: 'ECONNREFUSED' });
      });
      return req;
    });

    try {
      await (client as any).getDifficulty();
      expect.fail('Should have thrown an error');
    } catch (error: any) {
      expect(error.message).to.equal('Bitcoin JSON-RPC: Request Error: ECONNREFUSED');
    }
  });

  it('should fetch getRawMemPool', async function () {
    requestStub = sinon.stub(client['protocol'], 'request').callsFake((options, callback) => {
      const res = new EventEmitter() as any;
      res.statusCode = 200;
      setImmediate(() => {
        res.emit('data', JSON.stringify({ result: ['transaction1', 'transaction2'] }));
        res.emit('end');
      });
      callback(res);
      return { end: () => {} } as any;
    });

    const result = await client.getRawMemPool();
    expect(result).to.deep.equal(['transaction1', 'transaction2']);
  });

  it('should fetch getblockstats blockdata', async function () {
    const blockId = "00000000000000246f457f43fed448fe1506ae2d94c9cd078908c425ef5b2218";
    requestStub = sinon.stub(client['protocol'], 'request').callsFake((options, callback) => {
      const res = new EventEmitter() as any;
      res.statusCode = 200;
      setImmediate(() => {
        res.emit('data', JSON.stringify({ result: { total_size: 1000000 } }));
        res.emit('end');
      });
      callback(res);
      return { end: () => {} } as any;
    });

    const result = await client.getBlockStats(blockId, ['total_size']);
    expect(result).to.deep.equal({ total_size: 1000000 });
  });

  it('should fetch bigdata blockdata', async function () {
    const blockId = '00000000000000246f457f43fed448fe1506ae2d94c9cd078908c425ef5b2218';
    const restUrl = `/rest/block/${blockId}.bin`;

    requestStub = sinon.stub(client['protocol'], 'request').callsFake((options, callback) => {
      const res = new EventEmitter() as any;
      res.statusCode = 200;
      setImmediate(() => {
        res.emit('data', Buffer.from('mock block data'));
        res.emit('end');
      });
      callback(res);
      return { end: () => {} } as any;
    });

    const buf = await client.rest(restUrl);
    expect(buf).to.be.instanceof(Buffer);
    expect(buf.toString()).to.equal('mock block data');
  });

  it('should fetch block data', async function () {
    const blockId = '00000000000000246f457f43fed448fe1506ae2d94c9cd078908c425ef5b2218';
    requestStub = sinon.stub(client['protocol'], 'request').callsFake((options, callback) => {
      const res = new EventEmitter() as any;
      res.statusCode = 200;
      setImmediate(() => {
        res.emit('data', JSON.stringify({ result: 'mock block data' }));
        res.emit('end');
      });
      callback(res);
      return { end: () => {} } as any;
    });

    const result = await client.getBlock(blockId, 0);
    expect(result).to.equal('mock block data');
  });
  */
});
