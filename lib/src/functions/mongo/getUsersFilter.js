import { DbCon, UserModel } from "database";
import { apiResponse } from "src/common/api-response";
import { Logger } from "src/common/logger";
import { SentryWrapper } from "src/common/sentry";
let uri = process.env.MONGODB_URL;
export const getUsersByFilter = async (event, context) => {
    const logger = new Logger(context.awsRequestId);
    try {
        let filter = event.queryStringParameters['filterBy'];
        logger.INFO({ message: filter });
        let pipeline = [];
        if (filter) {
            pipeline.push({ $match: JSON.parse(filter) });
        }
        pipeline.push({ $project: { firstName: 1 } });
        logger.INFO({ message: JSON.stringify(pipeline) });
        await DbCon(uri);
        const users = await UserModel.aggregate(pipeline).exec();
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
export const main = SentryWrapper.AWSLambda.wrapHandler(getUsersByFilter);
//# sourceMappingURL=getUsersFilter.js.map