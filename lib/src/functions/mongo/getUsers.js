import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { dbConnection } from '/opt/nodejs/database';
export const getAllUsers = middyfy(async (_event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    await dbConnection();
    return formatJSONResponse({});
});
//# sourceMappingURL=getUsers.js.map