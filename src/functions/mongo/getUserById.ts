import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { Logger } from "src/common/logger";
import { SentryWrapper, setTransaction } from "src/common/sentry";
import { DbCon, UserModel } from 'database'
import { apiResponse } from "src/common/api-response";

let uri = process.env.MONGODB_URL;

export const getUserById = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
    context.callbackWaitsForEmptyEventLoop = false;
    const logger = new Logger(context.awsRequestId);

    const transaction = setTransaction();
    try {
        const userId = event.pathParameters['id'];
        logger.INFO({ message: "Getting users from the database " + userId })
        const dbtransaction = setTransaction('mongo', 'mongo-transaction');
        await DbCon(uri);
        const user = await UserModel.findById(userId);
        dbtransaction.finish();

        logger.INFO({ message: user.getFullName() })
        return apiResponse._200({ user });
    }
    catch (err) {
        SentryWrapper.captureException(err);
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

export const main = SentryWrapper.AWSLambda.wrapHandler(getUserById)