import { Context } from "aws-lambda";
import { apiResponse } from "src/common/api-response";
import { InitDb, AppDataSource } from '../../../typeorm/data-source'
import { Post } from '../../../typeorm/entity/post.model'

const success = {
    statusCode: 200,
    body: 'Success'
};

export const connect = async (event, context: Context, cb) => {

    if (event.requestContext.eventType === 'CONNECT') {
        console.log(event)
        console.log('INFO', `Connection id from the client ${event.requestContext.connectionId}`);

        cb(null, success)
    }
    else if (event.requestContext.eventType === "DISCONNECT") {
        console.log('INFO', `Disconnection id from the client ${event.requestContext.connectionId}`);
        cb(null, success)
    }


};

