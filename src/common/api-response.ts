export const apiResponse = {
    _200: (body: { [key: string]: any }) => {
        const data = { data: body }
        return {
            statusCode: 200,
            body: JSON.stringify(data, null, 2),
        };
    },
    _400: (body: { [key: string]: any }) => {
        return {
            statusCode: 400,
            body: JSON.stringify(body, null, 2),
        };
    },
    _500: (body: { [key: string]: any }) => {
        return {
            statusCode: 500,
            body: JSON.stringify(body, null, 2),
        };
    },
}