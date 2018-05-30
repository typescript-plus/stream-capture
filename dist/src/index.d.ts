/// <reference types="node" />
import { Writable } from 'stream';
export declare type SyncCallback<T> = (buffer: string[]) => T;
export declare type AsyncCallback<T> = (buffer: string[]) => Promise<T>;
export declare type Callback<T> = SyncCallback<T> | AsyncCallback<T>;
export interface Chunk {
    toString(...args: any[]): string;
}
export declare function capture<T>(writable: Writable, callback: (buffer: string[]) => Promise<T>): Promise<T>;
export declare function capture<T>(writable: Writable, callback: (buffer: string[]) => T): T;
