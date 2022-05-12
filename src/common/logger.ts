
const app_name = process.env.APP_NAME;
const app_stage = process.env.APP_SATGE;
const service_name = process.env.SERVICE_NAME;
export class Logger {
    _contextId: string;

    constructor(contextId: string) {
        this._contextId = contextId;
    }

    Error = (payload: LogPayload) => {
        payload = { app_name, app_stage, service_name, context_id: this._contextId, type: 'CRITICAL', ...payload };
        console.error(JSON.stringify(payload));
    }

    INFO = (payload: LogPayload) => {
        payload = { app_name, app_stage, service_name, context_id: this._contextId, type: 'INFO', ...payload };
        console.log(JSON.stringify(payload));
    }
}

export interface LogPayload {
    app_name?: string;
    app_stage?: string;
    service_name?: string;
    context_id?: string;
    type?: string;
    data?: any;
    message?: string;
    callstack?: string;
}