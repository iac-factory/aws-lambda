import type { HTTP } from "../../http";

type Variables = { [name: string]: string } | undefined;

export interface Context<Authorizer = any, Identity = any> {
    accountId: string;
    apiId: string;
    // This one is a bit confusing: it is not actually present in authorizer calls
    // and proxy calls without an authorizer. We model this by allowing undefined in the type,
    // since it ends up the same and avoids breaking users that are testing the property.
    // This lets us allow parameterizing the authorizer for proxy events that know what authorizer
    // context values they have.
    authorizer: Authorizer;
    connectedAt?: number | undefined;
    connectionId?: string | undefined;
    domainName?: string | undefined;
    domainPrefix?: string | undefined;
    eventType?: string | undefined;
    extendedRequestId?: string | undefined;
    protocol: string;
    httpMethod: string;
    identity: Identity;
    messageDirection?: string | undefined;
    messageId?: string | null | undefined;
    path: string;
    stage: string;
    requestId: string;
    requestTime?: string | undefined;
    requestTimeEpoch: number;
    resourceId: string;
    resourcePath: string;
    routeKey?: string | undefined;
}

/***
 * The Lambda Function Handler's {@link Event} Input Type
 */

interface Event {
    body: string | null;
    headers: HTTP.Headers.Variable | undefined | null;
    multiValueHeaders: HTTP.Headers.Dynamic | undefined | null;
    httpMethod: HTTP.Methods.Method | undefined | null;
    isBase64Encoded: boolean | undefined | null;
    path: string | undefined | null;
    pathParameters: HTTP.Path.Parameters | undefined | null;
    queryStringParameters: HTTP.Query.Parameters | undefined | null;
    multiValueQueryStringParameters: HTTP.Query.Dynamic | undefined | null;
    stageVariables: Variables;
    requestContext: Context;
    resource: string | undefined | null;
}

export {};
export default Event;
export type { Event };
