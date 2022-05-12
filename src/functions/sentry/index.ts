import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { apiResponse } from "src/common/api-response";
import { Logger } from "src/common/logger";
import { SentryWrapper, setTransaction } from "src/common/sentry";

const sentryTest = async (_event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
    context.callbackWaitsForEmptyEventLoop = false;
    const logger = new Logger(context.awsRequestId);
    const transaction = setTransaction()

    try {
        logger.INFO({ message: "Getting users from the database" })
        return apiResponse._200({ message: 'success' });
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

    //return formatJSONResponse({});
};

export const main = SentryWrapper.AWSLambda.wrapHandler(sentryTest)