
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { DbCon, UserModel } from '/opt/nodejs/database'
import { Logger } from '../../common/logger'

let uri = process.env.MONGODB_URL;

export const main = middyfy(async (_event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
    context.callbackWaitsForEmptyEventLoop = false;
    const logger = new Logger(context.awsRequestId);
    try {
        logger.INFO({ message: "Getting users from the database" })
        await DbCon(uri);
        const users = await UserModel.find().lean();
        logger.INFO({ data: users })
        return formatJSONResponse({ users });
    }
    catch (err) {
        logger.Error({
            message: err.message,
            callstack: err.stack,
        });
        return formatJSONResponse({ err });

    }

    //return formatJSONResponse({});
});