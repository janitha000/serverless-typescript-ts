import { Logger } from '../../common/logger';
import { DbCon, UserModel } from 'database';
import { apiResponse } from '../../common/api-response';
import { SentryWrapper, setTransaction } from 'src/common/sentry';
let uri = process.env.MONGODB_URL;
const users = async (event, context) => {
    const method = event.httpMethod;
    const logger = new Logger(context.awsRequestId);
    try {
        switch (method) {
            case 'GET':
                return getUsers(logger);
            case 'POST':
                return postUsers(event, logger);
            default:
                return apiResponse._500({
                    message: `method not allowed`,
                });
        }
    }
    catch (err) {
        SentryWrapper.captureException(err);
    }
};
export const getUsers = async (logger) => {
    const transaction = setTransaction();
    try {
        logger.INFO({ message: "Getting users from the database" });
        await DbCon(uri);
        const users = await UserModel.find().lean();
        logger.INFO({ data: users });
        logger.Error({ message: 'This is a test error testing' });
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
    finally {
        transaction.finish();
    }
};
export const postUsers = async (event, logger) => {
    const transaction = setTransaction();
    try {
        const user = event.body;
        await DbCon(uri);
        await UserModel.create(user);
    }
    catch (err) {
        logger.Error({
            message: err.message,
            callstack: err.stack,
        });
        SentryWrapper.captureException(err);
        return apiResponse._500({ err });
    }
    finally {
        transaction.finish();
    }
};
export const main = SentryWrapper.AWSLambda.wrapHandler(users);
//# sourceMappingURL=mongo-users.js.map