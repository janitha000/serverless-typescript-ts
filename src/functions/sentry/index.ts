import { middyfy } from "@libs/lambda";
import httpErrorHandler from "@middy/http-error-handler";
import httpSecurityHeaders from "@middy/http-security-headers";
import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { apiResponse } from "src/common/api-response";
import { Logger } from "src/common/logger";
import { SentryWrapper, setTransaction } from "src/common/sentry";

const sentryTest = middyfy(async (_event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
    const logger = new Logger(context.awsRequestId);
    //const transaction = setTransaction()

    try {
        logger.INFO({ message: "Getting users from the database" })
        throw new Error('Test middyfy error Error')
        return apiResponse._200({ message: 'success' });
    }
    catch (err) {
        logger.Error({
            message: err.message,
            callstack: err.stack,
        });

        const eventId = SentryWrapper.captureException(err);
        logger.INFO({ message: eventId })
        return apiResponse._500({ err });

    }
    finally {
        //transaction.finish();
    }

    //return formatJSONResponse({});
}).use(httpSecurityHeaders()).use(httpErrorHandler());



//export const main = sentryTest;

export const main = SentryWrapper.AWSLambda.wrapHandler(sentryTest)