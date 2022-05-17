import { formatJSONResponse } from "@libs/api-gateway";
import { StepFunctions } from 'aws-sdk';
import { SentryWrapper, setTransaction } from "src/common/sentry";
export const startStateMachine = async (_event) => {
    const transaction = setTransaction();
    let stepFunctions = new StepFunctions({ apiVersion: '2016-11-23' });
    let stateMachineArn = 'arn:aws:states:ap-southeast-1:628640267234:stateMachine:statemachinetypescript';
    const params = { stateMachineArn };
    console.log(`PARAMS: ${JSON.stringify(params)}`);
    try {
        console.log('Sending create request to aws');
        let data = await stepFunctions.startExecution(params).promise();
        return formatJSONResponse({
            data: data,
        });
    }
    catch (err) {
        console.log(err);
        SentryWrapper.captureException(err);
        return formatJSONResponse({
            err: err,
        });
    }
    finally {
        transaction.finish();
    }
};
export const main = SentryWrapper.AWSLambda.wrapHandler(startStateMachine);
//# sourceMappingURL=startStepFunction.js.map