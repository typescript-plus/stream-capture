/// <reference types="node" />
import { Writable } from 'stream';
export declare function captureSync(writable: Writable, callback: () => void): string;
