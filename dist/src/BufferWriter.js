"use strict";
exports.__esModule = true;
exports.BufferWriter = void 0;
var BufferWriter = /** @class */ (function () {
    function BufferWriter() {
        this.buffers = [];
        this.buffers = [];
    }
    BufferWriter.prototype.write = function (buffer) {
        this.buffers.push(buffer);
    };
    BufferWriter.prototype.toBuffer = function () {
        return Buffer.concat(this.buffers);
    };
    return BufferWriter;
}());
exports.BufferWriter = BufferWriter;
