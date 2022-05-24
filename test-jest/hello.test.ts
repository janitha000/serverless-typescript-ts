import { APIGatewayProxyEvent, Context } from "aws-lambda";
import { main, middyfyMain } from "../src/functions/hello/handler";

describe('Unit test for app handler', function () {
    it('verifies successful response', async () => {
        const event: APIGatewayProxyEvent = {
            httpMethod: 'GET',
            queryStringParameters: {
                a: "1"
            }
        } as any

        const context: Context = {
            awsRequestId: 'test'
        } as any;

        const result = await middyfyMain(event, context)

        expect(result.statusCode).toEqual(200);
        expect(result.body.data).not.toBeNull();
        console.log(JSON.parse(result.body))
        expect(JSON.parse(result.body).data.message).not.toBeNull();
        expect(JSON.parse(result.body).data.message).toEqual("This is from the middleware hhtp");
    });
});