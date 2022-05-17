import { DbCon, UserModel, DepartmentModel } from "database";
import { apiResponse } from "src/common/api-response";
import { SentryWrapper } from "src/common/sentry";
let uri = process.env.MONGODB_URL;
export const postUsers = async (event, logger) => {
    try {
        logger.INFO({ data: JSON.parse(event.body) });
        const user = JSON.parse(event.body);
        await DbCon(uri);
        const department = await DepartmentModel.findOne({ name: "IT" }).lean();
        user.department = department._id;
        await UserModel.create(user);
        return apiResponse._200({ user });
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
//# sourceMappingURL=postUsers.js.map