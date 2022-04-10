import type { Context } from "../types/lambda/function/context.js";

const Callable: () => Context = () => {
    return {
        awsRequestId: "[... Default (awsRequestId)]",
        callbackWaitsForEmptyEventLoop: false,
        functionName: "[... Default (functionName)]",
        functionVersion: "[... Default (functionVersion)]",
        invokedFunctionArn: "[... Default (invokedFunctionArn)]",
        logGroupName: "[... Default (logGroupName)]",
        logStreamName: "[... Default (logStreamName)]",
        memoryLimitInMB: "[... Default (memoryLimitInMB)]",
        clientContext: undefined,
        identity: undefined,

        getRemainingTimeInMillis: () => 0,

        done: () => null,
        fail: () => null,
        succeed: () => null
    };
};

const Default = Callable();

export type { Context };
export { Callable, Default };
export default { Callable, Default };
