import { apiResponse } from "src/common/api-response";
import { loadSequelize } from "./postgresDb";
export const main = async (_event) => {
    console.log('getting postgres users');
    let seq = null;
    try {
        seq = await loadSequelize();
        return apiResponse._200({ message: "this is from postgres" });
    }
    finally {
        await seq.connectionManager.close();
    }
};
//# sourceMappingURL=handler.js.map