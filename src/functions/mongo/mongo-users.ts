
// import { middyfy } from '@libs/lambda';
import { APIGatewayEvent, APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
// import { DbCon, UserModel } from '/opt/nodejs/database'
import { Logger } from '../../common/logger'
import { DbCon, UserModel } from 'database'
import { apiResponse } from '../../common/api-response'
import { SentryWrapper, setTransaction } from 'src/common/sentry';

let uri = process.env.MONGODB_URL;

// export const main = middyfy(async (_event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
//     context.callbackWaitsForEmptyEventLoop = false;
//     const logger = new Logger(context.awsRequestId);
//     try {
//         logger.INFO({ message: "Getting users from the database" })
//         await DbCon(uri);
//         const users = await UserModel.find().lean();
//         logger.INFO({ data: users })
//         return formatJSONResponse({ users });
//     }
//     catch (err) {
//         logger.Error({
//             message: err.message,
//             callstack: err.stack,
//         });
//         return formatJSONResponse({ err });

//     }

//     //return formatJSONResponse({});
// });

const users = async (event: APIGatewayProxyEvent, context: Context) => {
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

export const getUsers = async (logger: Logger) => {

    const transaction = setTransaction();
    try {
        logger.INFO({ message: "Getting users from the database" })
        await DbCon(uri);
        const users = await UserModel.find().lean();
        logger.INFO({ data: users })
        logger.Error({ message: 'This is a test error testing' })
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

export const postUsers = async (event: APIGatewayProxyEvent, logger: Logger) => {
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
}

export const main = SentryWrapper.AWSLambda.wrapHandler(users)