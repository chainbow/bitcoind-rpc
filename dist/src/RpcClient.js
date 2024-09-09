"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var http_1 = require("http");
var https_1 = require("https");
var url_1 = require("url");
var BufferWriter_1 = require("./BufferWriter");
var rpcMethodSpecs_1 = require("./rpcMethodSpecs");
var RpcClient = /** @class */ (function () {
    function RpcClient(opts) {
        if (opts === void 0) { opts = {}; }
        var _a;
        if (typeof opts === 'string') {
            opts = RpcClient.decodeURL(opts);
        }
        this.host = opts.host || '127.0.0.1';
        this.port = opts.port || 8332;
        this.user = opts.user || 'user';
        this.pass = opts.pass || 'pass';
        this.protocol = opts.protocol === 'http' ? http_1["default"] : https_1["default"];
        this.disableAgent = opts.disableAgent || false;
        this.rejectUnauthorized = (_a = opts.rejectUnauthorized) !== null && _a !== void 0 ? _a : true;
        this.rpcSpecs = rpcMethodSpecs_1.rpcMethodSpecs;
        return new Proxy(this, {
            get: function (target, name) {
                if (name in target) {
                    return target[name];
                }
                var methodName = name.toLowerCase();
                return function () {
                    var params = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        params[_i] = arguments[_i];
                    }
                    return target.callRpc(methodName, params);
                };
            }
        });
    }
    RpcClient.decodeURL = function (str) {
        var parsedUrl = new url_1.URL(str);
        return {
            host: parsedUrl.hostname,
            port: parseInt(parsedUrl.port, 10),
            protocol: parsedUrl.protocol.slice(0, -1),
            user: parsedUrl.username,
            pass: parsedUrl.password
        };
    };
    RpcClient.prototype.callRpc = function (methodName, params) {
        return __awaiter(this, void 0, void 0, function () {
            var spec;
            return __generator(this, function (_a) {
                if (!(methodName in this.rpcSpecs)) {
                    throw new Error("Unknown RPC method: ".concat(methodName));
                }
                spec = this.rpcSpecs[methodName];
                if (params.length < spec.minParams || params.length > spec.maxParams) {
                    throw new Error("Invalid number of parameters for ".concat(methodName, ". Expected ").concat(spec.minParams, " to ").concat(spec.maxParams, ", got ").concat(params.length));
                }
                // Validate parameter types
                params.forEach(function (param, index) {
                    var paramSpec = spec.params[index];
                    if (paramSpec && typeof param !== paramSpec.type) {
                        throw new Error("Invalid type for parameter ".concat(paramSpec.name, " in ").concat(methodName, ". Expected ").concat(paramSpec.type, ", got ").concat(typeof param));
                    }
                });
                return [2 /*return*/, this.rpc({
                        method: methodName,
                        params: params
                    })];
            });
        });
    };
    RpcClient.prototype.rpc = function (request) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var auth = Buffer.from("".concat(_this.user, ":").concat(_this.pass)).toString('base64');
            var options = {
                host: _this.host,
                port: _this.port,
                path: '/',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic ".concat(auth)
                },
                rejectUnauthorized: _this.rejectUnauthorized,
                agent: _this.disableAgent ? false : undefined
            };
            var req = _this.protocol.request(options, function (res) {
                var bufferWriter = new BufferWriter_1.BufferWriter();
                res.on('data', function (chunk) { return bufferWriter.write(Buffer.from(chunk)); });
                res.on('end', function () {
                    var buffer = bufferWriter.toBuffer();
                    if (res.statusCode === 401) {
                        reject(new Error('Bitcoin JSON-RPC: Connection Rejected: 401 Unauthorized'));
                        return;
                    }
                    if (res.statusCode === 403) {
                        reject(new Error('Bitcoin JSON-RPC: Connection Rejected: 403 Forbidden'));
                        return;
                    }
                    if (res.statusCode === 500 && buffer.toString('utf8') === 'Work queue depth exceeded') {
                        var error = new Error('Bitcoin JSON-RPC: Work queue depth exceeded');
                        error.code = 429;
                        reject(error);
                        return;
                    }
                    try {
                        var parsedBuffer = JSON.parse(buffer.toString());
                        if (parsedBuffer.error) {
                            reject(new Error("Bitcoin JSON-RPC: ".concat(parsedBuffer.error.message)));
                        }
                        else {
                            resolve(parsedBuffer.result);
                        }
                    }
                    catch (e) {
                        console.error(e);
                        console.error(buffer.toString());
                        console.error("HTTP Status code: ".concat(res.statusCode));
                        reject(new Error("Bitcoin JSON-RPC: Error Parsing JSON: ".concat(e.message)));
                    }
                });
            });
            req.on('error', function (e) {
                console.error("Request Error: ".concat(e.message));
                reject(new Error("Bitcoin JSON-RPC: Request Error: ".concat(e.message)));
            });
            req.write(JSON.stringify(request));
            req.end();
        });
    };
    // You can still define specific methods if needed
    RpcClient.prototype.getBlockCount = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.callRpc('getblockcount', [])];
            });
        });
    };
    return RpcClient;
}());
exports["default"] = RpcClient;
