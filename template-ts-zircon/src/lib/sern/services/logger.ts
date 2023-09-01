import type { LogPayload, Logging } from "@sern/handler";
import pino from "pino";
import { resolve } from 'path'
/**
 * Pino logger
 * Transports logging to another file and off the main thread.
 * This helps with reducing the overhead of logging. Utilizes worker threads
 * Logger file format -> {UTCTIMESTAMP}-{LOG_FILE}
 */
export class Logger implements Logging {

    // ISO time seems to break pino.
    // https://github.com/pinojs/pino/issues/1695
    #logPath = resolve('logs', new Date().getTime()+'-'+process.env.LOG_FILE)
    #transport =
        process.env.MODE === 'PROD' 
            ? pino.transport({
                target: 'pino/file',
                options: { destination: this.#logPath, mkdir: true },
            })
            : pino.transport({
                target: 'pino-pretty',
            })

    #logger = pino(this.#transport);

    error(payload: LogPayload<unknown>): void {
        this.#logger.error(payload.message)
    }
    warning(payload: LogPayload<unknown>): void {
        this.#logger.warn(payload.message)
    }
    info(payload: LogPayload<unknown>): void {
        this.#logger.info(payload.message)
    }
    debug(payload: LogPayload<unknown>): void {
        this.#logger.debug(payload.message)
    }
}
