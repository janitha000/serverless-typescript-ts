export const apiResponse = {
    _200: (body) => {
        const data = { data: body };
        return {
            statusCode: 200,
            body: JSON.stringify(data, null, 2),
        };
    },
    _400: (body) => {
        return {
            statusCode: 400,
            body: JSON.stringify(body, null, 2),
        };
    },
    _500: (body) => {
        return {
            statusCode: 500,
            body: JSON.stringify(body, null, 2),
        };
    },
};
//# sourceMappingURL=api-response.js.map