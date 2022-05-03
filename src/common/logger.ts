
export class Logger {
    _contextId: string;

    constructor(contextId: string) {
        this._contextId = contextId;
    }

    Error = (payload) => {
        const app_name = process.env.APP_NAME;
        const app_stage = process.env.APP_SATGE;
        const service_name = process.env.SERVICE_NAME;
        payload = { app_name, app_stage, service_name, context_id: this._contextId, type: 'CRITICAL', ...payload };
        console.log(JSON.stringify(payload));
    }

    INFO = (payload) => {
        const app_name = process.env.APP_NAME;
        const app_stage = process.env.APP_SATGE;
        const service_name = process.env.SERVICE_NAME;
        payload = { app_name, app_stage, service_name, context_id: this._contextId, type: 'INFO', ...payload };
        console.log(JSON.stringify(payload));
    }
}