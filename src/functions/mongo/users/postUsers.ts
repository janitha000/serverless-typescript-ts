import { APIGatewayProxyEvent } from "aws-lambda";
import { DbCon, UserModel, User, DepartmentModel } from "database";
import { apiResponse } from "src/common/api-response";
import { Logger } from "src/common/logger";
import { SentryWrapper } from "src/common/sentry";

let uri = process.env.MONGODB_URL;

export const postUsers = async (event: APIGatewayProxyEvent, logger: Logger) => {
    try {
        logger.INFO({ data: JSON.parse(event.body) })
        const user: User = JSON.parse(event.body);
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
        // if (err instanceof mongoose.Error.ValidationError) return apiResponse._400({ err });
        return apiResponse._500({ err });

    }
}