import type { APIGatewayProxyEvent } from "aws-lambda";
import type { APIGatewayProxyEventV2 } from "aws-lambda";
import type { APIGatewayProxyResult } from "aws-lambda";
import type { APIGatewayProxyResultV2 } from "aws-lambda";

import type { Handler as Base } from "./base.js";

declare namespace Handler {
    type Event = [ APIGatewayProxyEvent, APIGatewayProxyEventV2, any ];
    type Result = [ APIGatewayProxyResult, APIGatewayProxyResultV2, any ];

    /*** @todo - Implement other Request Type(s); e.g. S3ProxyRequest, SNSProxyRequest, etc. etc. */
    interface Request {
        /***
         * API-Gateway Proxy Event - ReSTful - (Version 1, Payload 1.0)
         *
         * @type {@link APIGatewayProxyEvent}
         *
         * See {@link https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html API Integrations} for details.
         */
        ReSTful: Event[0];
        /***
         * API-Gateway Proxy Event - HTTP - (Version 2, Payload 2.0)
         *
         * @type {@link APIGatewayProxyEventV2}
         *
         * See {@link https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html API Integrations} for details.
         */
        HTTP: Event[1];
        Base: Event[2];
    }

    /*** @todo - Implement other Response Type(s); e.g. S3ProxyResponse, SNSProxyResponse, etc. etc. */
    interface Response {
        /***
         * API-Gateway Proxy Response - ReSTful - (Version 1, Payload 1.0)
         *
         * @type {@link APIGatewayProxyResult}
         *
         * See {@link https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html API Integrations} for details.
         */
        ReSTful: Result[0];
        /***
         * API-Gateway Proxy Response - HTTP - (Version 2, Payload 2.0)
         *
         * @type {@link APIGatewayProxyResultV2}
         *
         * See {@link https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html API Integrations} for details.
         */
        HTTP: Result[1];
        Base: Result[2];
    }

    export type { Base, Event, Result, Request, Response };
}

export {};
export default Handler;
export type { Handler };
