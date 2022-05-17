import { DbCon, DepartmentModel } from "database";
import { apiResponse } from "src/common/api-response";
import { SentryWrapper } from "src/common/sentry";
let uri = process.env.MONGODB_URL;
export const getDepartments = async (logger) => {
    try {
        logger.INFO({ message: "Getting departments from the database" });
        await DbCon(uri);
        const departments = await DepartmentModel.find().lean().populate({ path: 'numUsers' });
        logger.INFO({ data: departments });
        return apiResponse._200({ departments });
    }
    catch (err) {
        logger.Error({
            message: err.message,
            callstack: err.stack,
        });
        SentryWrapper.captureException(err);
        return apiResponse._500({ err });
    }
};
//# sourceMappingURL=getDepartments.js.map