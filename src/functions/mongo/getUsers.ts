
// import { middyfy } from '@libs/lambda';
import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
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

export const getUsers = async (_event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
    context.callbackWaitsForEmptyEventLoop = false;
    const logger = new Logger(context.awsRequestId);

    const transaction = setTransaction();
    try {
        logger.INFO({ message: "Getting users from the database" })
        const dbtransaction = setTransaction('mongo', 'mongo-transaction');
        await DbCon(uri);
        const users = await UserModel.find().lean();
        dbtransaction.finish();
        logger.INFO({ data: users })
        logger.Error({ message: 'This is a test error testing' })
        return apiResponse._200({ users });
    }
    catch (err) {
        logger.Error({
            message: err.message,
            callstack: err.stack,
        });
        return apiResponse._500({ err });

    }
    finally {
        transaction.finish();
    }

    //return formatJSONResponse({});
};

export const main = SentryWrapper.AWSLambda.wrapHandler(getUsers)