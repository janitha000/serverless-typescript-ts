export const createStepFunction = {
    createStepFunction: {
        handler: `src/functions/step/handler.createStateMachine`,
        events: [
            {
                http: {
                    method: 'post',
                    path: 'stepFunction',
                },
            },
        ],
    }
}