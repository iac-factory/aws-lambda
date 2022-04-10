/***
 * The Lambda Function Handler's {@link Context} Input Type
 *
 * See {@link https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html AWS documentation}.
 */

import type { ClientContext, CognitoIdentity, Context as Base } from "aws-lambda";

interface Context extends Base {
    callbackWaitsForEmptyEventLoop: boolean;
    functionName: string;
    functionVersion: string;
    invokedFunctionArn: string;
    memoryLimitInMB: string;
    awsRequestId: string;
    logGroupName: string;
    logStreamName: string;
    identity?: CognitoIdentity | undefined;
    clientContext?: ClientContext | undefined;

    getRemainingTimeInMillis(): number;
}

export {};
export default Context;
export type { Context };
