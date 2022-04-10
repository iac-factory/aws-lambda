import { Callable as context } from "./context.js";

import type { Event } from "../types/lambda/function/event.js";

const Callable: () => Event = (): Event => {
    const data = context();

    const $: Event = {
        body: "{\"$\": \"Local-Content\"}",
        headers: { Header: "Value" },
        multiValueHeaders: undefined,
        httpMethod: "GET",
        isBase64Encoded: false,
        path: "/",
        pathParameters: undefined,
        queryStringParameters: undefined,
        multiValueQueryStringParameters: undefined,
        stageVariables: undefined,
        requestContext: {
            accountId: "0000000000000000",
            apiId: "000000",
            authorizer: undefined,
            connectedAt: undefined,
            connectionId: undefined,
            domainName: undefined,
            domainPrefix: undefined,
            eventType: undefined,
            extendedRequestId: undefined,
            protocol: "https",
            httpMethod: "GET",
            identity: data.identity,
            messageDirection: undefined,
            messageId: undefined,
            path: "/",
            stage: "local",
            requestId: "[... Default (requestId)]",
            requestTime: undefined,
            requestTimeEpoch: data.getRemainingTimeInMillis(),
            resourceId: "arn:::local",
            resourcePath: "/",
            routeKey: undefined
        },
        resource: "[... Default (resource)]"
    };

    return $;
};

const Default = Callable();

export type { Event };
export { Callable, Default };
export default { Callable, Default };
