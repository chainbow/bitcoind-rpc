/// <reference types="node" />
export declare class BufferWriter {
    private buffers;
    constructor();
    write(buffer: Buffer | string): void;
    toBuffer(): Buffer;
}
