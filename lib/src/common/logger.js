const app_name = process.env.APP_NAME;
const app_stage = process.env.APP_SATGE;
const service_name = process.env.SERVICE_NAME;
export class Logger {
    constructor(contextId) {
        this.Error = (payload) => {
            payload = { app_name, app_stage, service_name, context_id: this._contextId, type: 'CRITICAL', ...payload };
            console.log(JSON.stringify(payload));
        };
        this.INFO = (payload) => {
            payload = { app_name, app_stage, service_name, context_id: this._contextId, type: 'INFO', ...payload };
            console.log(JSON.stringify(payload));
        };
        this._contextId = contextId;
    }
}
//# sourceMappingURL=logger.js.map