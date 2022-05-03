import { formatJSONResponse } from "@libs/api-gateway";
import { StepFunctions } from 'aws-sdk';
export const main = async (_event) => {
    let stepFunctions = new StepFunctions();
    let definitionObj = {
        "Comment": "A description of my state machine",
        "StartAt": "Wait",
        "States": {
            "Wait": {
                "Type": "Wait",
                "Seconds": 10,
                "Next": "Success"
            },
            "Success": {
                "Type": "Succeed"
            }
        }
    };
    let definition = JSON.stringify(definitionObj);
    let name = 'serverlessAPIStepMachine';
    let roleArn = 'arn:aws:iam::628640267234:role/serverless-step-dev-StatemachinetypescriptRole-1BDVRJBTJFQ9G';
    const params = { definition, name, roleArn };
    console.log(`PARAMS: ${JSON.stringify(params)}`);
    try {
        console.log('Sending create request to aws');
        let data = await stepFunctions.createStateMachine(params).promise();
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
//# sourceMappingURL=createStepFunction.js.map