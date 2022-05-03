import { formatJSONResponse } from "@libs/api-gateway";
import { StepFunctions } from 'aws-sdk';
export const main = async (event) => {
    let stepFunctions = new StepFunctions();
    const { id } = event.pathParameters;
    const params = { stateMachineArn: id };
    console.log(`PARAMS: ${JSON.stringify(params)}`);
    try {
        console.log('Sending delete request to aws');
        let data = await stepFunctions.deleteStateMachine(params).promise();
        return formatJSONResponse({
            data: data,
        });
    }
    catch (err) {
        console.log(err);
        return formatJSONResponse({
            err: err,
        });
    }
};
//# sourceMappingURL=deleteStepFunction.js.map