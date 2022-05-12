import { APIGatewayProxyEvent, Context } from "aws-lambda";
import { apiResponse } from "src/common/api-response";
import { Logger } from "src/common/logger";
import { SentryWrapper } from "src/common/sentry";

const users = async (event: APIGatewayProxyEvent, context: Context) => {
    const logger = new Logger(context.awsRequestId);
    const method = event.httpMethod;

    try {
        switch (method) {
            case 'GET':
                return apiResponse._200({
                    message: `Hello, this is from the api GET method`,
                });
            case 'POST':
                return PostUsers(event);
            case 'PUT':
                return PutUsers();
            case 'DELETE':
                return DeleteUsers();
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

export const main = SentryWrapper.AWSLambda.wrapHandler(users);

const PostUsers = (event: APIGatewayProxyEvent) => {

    return apiResponse._200({
        message: `Hello, this is from the api POST method`,
        body: event.body
    });
}

const PutUsers = () => {
    return apiResponse._200({
        message: `Hello, this is from the api PUT method`,
    });
}

const DeleteUsers = () => {
    return apiResponse._200({
        message: `Hello, this is from the api DELETE method`,
    });
}