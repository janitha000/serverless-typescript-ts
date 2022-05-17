import { DbCon, UserModel } from "database";
import { apiResponse } from "src/common/api-response";
import { SentryWrapper } from "src/common/sentry";
let uri = process.env.MONGODB_URL;
export const getUsers = async (logger) => {
    try {
        logger.INFO({ message: "Getting users from the database" });
        await DbCon(uri);
        const users = await UserModel.find().lean();
        logger.INFO({ data: users });
        return apiResponse._200({ users });
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
//# sourceMappingURL=getUsers.js.map