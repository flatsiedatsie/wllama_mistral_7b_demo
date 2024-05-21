/**
 * Module code will be copied into worker.
 *
 * Messages between main <==> worker:
 *
 * From main thread to worker:
 * - Send direction: { verb, args, callbackId }
 * - Result direction: { callbackId, result } or { callbackId, err }
 *
 * Signal from worker to main:
 * - Unidirection: { verb, args }
 */
interface Logger {
    debug: typeof console.debug;
    log: typeof console.log;
    warn: typeof console.warn;
    error: typeof console.error;
}
interface TaskParam {
    verb: 'module.init' | 'module.upload' | 'wllama.start' | 'wllama.action' | 'wllama.exit' | 'wllama.debug';
    args: any[];
    callbackId: number;
}
interface Task {
    resolve: any;
    reject: any;
    param: TaskParam;
}
export declare class ProxyToWorker {
    logger: Logger;
    suppressNativeLog: boolean;
    taskQueue: Task[];
    taskId: number;
    resultQueue: Task[];
    busy: boolean;
    worker?: Worker;
    pathConfig: any;
    multiThread: boolean;
    nbThread: number;
    constructor(pathConfig: any, nbThread: number | undefined, suppressNativeLog: boolean, logger: Logger);
    moduleInit(ggufBuffers: ArrayBuffer[]): Promise<void>;
    wllamaStart(): Promise<number>;
    wllamaAction(name: string, body: any): Promise<any>;
    wllamaExit(): Promise<{
        success: boolean;
    }>;
    wllamaDebug(): Promise<any>;
    private parseResult;
    private pushTask;
    private runTaskLoop;
    private onRecvMsg;
    private abort;
    private freeBuffer;
}
export {};
