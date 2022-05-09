import { APIGatewayProxyEvent, Context } from "aws-lambda";
import { main } from "../src/functions/mongo/getUsers";
import * as database from 'database'

describe('Unit test for mongo handler', function () {
    it('should get users from mongo', async () => {
        const expectedResult = { name: 'test' };
        //@ts-ignore
        jest.spyOn(database.UserModel, 'find').mockReturnValueOnce({
            lean: jest.fn().mockReturnValue(expectedResult),
        });
        jest.spyOn(database, 'DbCon').mockReturnValueOnce(Promise.resolve({}));

        const event: APIGatewayProxyEvent = {
            queryStringParameters: {
                a: "1"
            }
        } as any

        const context: Context = {
            awsRequestId: 'test'
        } as any;

        const result = await main(event, context)

        expect(result.statusCode).toEqual(200);
        expect(JSON.parse(result.body).data.users).toEqual(expectedResult)
    });

    it('should get users from mongo', async () => {
        const expectedResult = { name: 'test' };
        //@ts-ignore
        const mockModel = jest.spyOn(database.UserModel, 'find').mockReturnValueOnce({
            lean: jest.fn().mockReturnValue(expectedResult),
        });
        jest.spyOn(database, 'DbCon').mockReturnValueOnce(Promise.resolve({}));

        const event: APIGatewayProxyEvent = {
            queryStringParameters: {
                a: "1"
            }
        } as any

        const context: Context = {
            awsRequestId: 'test'
        } as any;

        const result = await main(event, context)

        expect(result.statusCode).toEqual(200);
        expect(JSON.parse(result.body).data.users).toEqual(expectedResult)
    });
    it('should return error', async () => {
        const expectedResult = { name: 'test' };
        //@ts-ignore
        const mockModel = jest.spyOn(database.UserModel, 'find').mockReturnValueOnce({
            lean: jest.fn().mockReturnValue(expectedResult),
        });
        jest.spyOn(database, 'DbCon').mockReturnValueOnce(Promise.reject({}));

        const event: APIGatewayProxyEvent = {
            queryStringParameters: {
                a: "1"
            }
        } as any

        const context: Context = {
            awsRequestId: 'test'
        } as any;

        const result = await main(event, context)

        expect(result.statusCode).toEqual(500);
    });

});