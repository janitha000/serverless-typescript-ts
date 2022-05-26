import middy from '@middy/core'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { apiResponse } from './api-response'

const validationMiddleware = (): middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {
    const before: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (
        request
    ): Promise<void> => {
        console.log('THIS IS FROM VALIDATION')
        // console.log(request)
    }

    const after: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (
        request
    ): Promise<void> => {
        console.log("VALIDATION MIDDLEWARE")
        console.log(request.error)
    }

    const onError: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (
        request
    ) => {
        console.log("VALIDATION MIDDLEWARE ERROR")
        let cause = request.error.cause;
        return apiResponse._400({ validationErrors: cause })
    }

    return {
        before,
        after,
        onError
    }
}

export default validationMiddleware