export class BufferWriter {
  private buffers: Buffer[];

  constructor() {
    this.buffers = [];
  }

  write(buffer: Buffer | string): void {
    this.buffers.push(Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer));
  }

  toBuffer() {
    return Buffer.concat(this.buffers);
  }
}

