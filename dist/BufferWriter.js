"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BufferWriter = void 0;
class BufferWriter {
    constructor() {
        this.buffers = [];
    }
    write(buffer) {
        this.buffers.push(Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer));
    }
    toBuffer() {
        return Buffer.concat(this.buffers);
    }
}
exports.BufferWriter = BufferWriter;
