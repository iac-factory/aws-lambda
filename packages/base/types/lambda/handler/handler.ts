/**
 * The interface that AWS Lambda will invoke your handler with.
 * There are more specialized types for many cases where AWS services
 * invoke your lambda, but you can directly use this type for when you are invoking
 * your lambda directly.
 *
 * See the {@link http://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-handler.html AWS documentation}
 * for more information about the runtime behavior, and the
 * {@link https://aws.amazon.com/blogs/compute/node-js-8-10-runtime-now-available-in-aws-lambda/ AWS Blog post}
 * introducing the async handler behavior.
 *
 * @example Defining a custom handler type
 * import type { Handler } from "@local/ci";
 *
 * interface NameEvent {
 *     fullName: string
 * }
 *
 * interface NameResult {
 *     firstName: string
 *     middleNames: string
 *     lastName: string
 * }
 *
 * type PersonHandler = Handler<NameEvent, NameResult>
 *
 * export const handler: PersonHandler = async (event) => {
 *   const names = event.fullName.split(" ")
 *   const firstName = names.shift()
 *   const lastName = names.pop()
 *   return { firstName, middleNames: names, lastName }
 * }
 *
 * @example Logs the contents of the event object and returns the location of the logs
 * import type { Handler } from "@local/ci";
 *
 * export const handler: Handler = async (event, context) => {
 *   console.log("EVENT: \n" + JSON.stringify(event, null, 2))
 *   return context.logStreamName
 * }
 *
 * @example AWS SDK with Async Function and Promises
 * import type { Handler } from "@local/ci";
 * import AWS from 'aws-sdk'
 *
 * const s3 = new AWS.S3()
 *
 * export const handler: Handler = async (event) => {
 *   const response = await s3.listBuckets().promise()
 *   return response?.Buckets.map((bucket) => bucket.Name)
 * }
 *
 * @example HTTP Request with Callback
 * import type { Handler } from "@local/ci";
 * import https from 'https'
 *
 * let url = "https://docs.aws.amazon.com/lambda/latest/dg/welcome.html"
 *
 * export const handler: Handler<void, number> = (event, context, callback) => {
 *  https.get(url, (res) => {
 *    callback(null, res.statusCode)
 *  }).on('error', (e) => {
 *    callback(Error(e))
 *  })
 * }
 *
 * @param event
 *      Parsed JSON data in the lambda request payload. For an AWS service triggered
 *      lambda this should be in the format of a type ending in Event, for example the
 *      S3Handler receives an event of type S3Event.
 *
 * @param context
 *      Runtime contextual information of the current invocation, for example the caller
 *      identity, available memory and time remaining, legacy completion callbacks, and
 *      a mutable property controlling when the lambda execution completes.
 *
 * @param callback
 *      NodeJS-style completion callback that the AWS Lambda runtime will provide that can
 *      be used to provide the lambda result payload value, or any execution error. Can
 *      instead return a promise that resolves with the result payload value or rejects
 *      with the execution error.
 *
 * @return
 *      A promise that resolves with the lambda result payload value, or rejects with the
 *      execution error. Note that if you implement your handler as an async function,
 *      you will automatically return a promise that will resolve with a returned value,
 *      or reject with a thrown value.
 */
export type Handler<Event = any, Result = any> = (
    event: Event,
    context: Context
) => void | Promise<Result>;

/***
 * {@link Handler} context parameter.
 *
 * See {@link https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html AWS documentation}.
 */
export interface Context {
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

export interface CognitoIdentity {
    cognitoIdentityId: string;
    cognitoIdentityPoolId: string;
}

export interface ClientContext {
    client: ClientContextClient;
    Custom?: any;
    env: Environment;
}

export interface ClientContextClient {
    installationId: string;
    appTitle: string;
    appVersionName: string;
    appVersionCode: string;
    appPackageName: string;
}

export interface Environment {
    platformVersion: string;
    platform: string;
    make: string;
    model: string;
    locale: string;
}

/**
 * NodeJS-style callback parameter for the {@link Handler} type.
 * Can be used instead of returning a promise, see the
 * {@link https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-handler.html AWS documentation}
 * for the handler programming model.
 *
 * @param error
 *   Parameter to use to provide the error payload for a failed lambda execution.
 *   See {@link https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-mode-exceptions.html AWS documentation}
 *   for error handling.
 *   If an Error instance is passed, the error payload uses the `name` property as the `errorType`,
 *   the `message` property as the `errorMessage`, and parses the `stack` property string into
 *   the `trace` array.
 *   For other values, the `errorType` is `typeof value`, the `errorMessage` is `String(value)`, and
 *   `trace` is an empty array.
 *
 * @param result
 *   Parameter to use to provide the result payload for a successful lambda execution.
 *   Pass `null` or `undefined` for the `error` parameter to use this parameter.
 */
export type Callback<Result = any> = ( error?: Error | string | null, result?: Result ) => void;
