import type { APIGatewayProxyHandler } from "./handler.js";
import type { APIGatewayProxyWithCognitoAuthorizerHandler } from "./handler.js";
import type { APIGatewayProxyWithLambdaAuthorizerHandler } from "./handler.js";

import type { APIGatewayProxyEvent } from "./handler.js";
import type { APIGatewayProxyWithCognitoAuthorizerEvent } from "./handler.js";
import type { APIGatewayProxyWithLambdaAuthorizerEvent } from "./handler.js";

/// import type { ClientContext } from "aws-lambda";
/// import type { ClientContextClient } from "aws-lambda";
/// import type { ClientContextEnv } from "aws-lambda";
/// import type { APIGatewayAuthorizerResultContext } from "aws-lambda";
/// import type { ALBEventRequestContext } from "aws-lambda";
/// import type { APIGatewayAuthorizerWithContextCallback } from "aws-lambda";
/// import type { APIGatewayAuthorizerWithContextHandler } from "aws-lambda";
/// import type { APIGatewayAuthorizerWithContextResult } from "aws-lambda";
/// import type { APIGatewayEventDefaultAuthorizerContext } from "aws-lambda";
/// import type { APIGatewayEventRequestContext } from "aws-lambda";
/// import type { APIGatewayEventLambdaAuthorizerContext } from "aws-lambda";
/// import type { APIGatewayEventRequestContextJWTAuthorizer } from "aws-lambda";
/// import type { APIGatewayEventRequestContextLambdaAuthorizer } from "aws-lambda";

//@todo import type { APIGatewayProxyHandlerV2 } from "./handler";
//@todo import type { APIGatewayProxyHandlerV2WithJWTAuthorizerr } from "./handler";
//@todo import type { APIGatewayProxyHandlerV2WithLambdaAuthorizer } from "./handler";

import type { Result } from "./result.js";

declare namespace Gateway {
    namespace Handler {
        namespace V1 {
            namespace Handler {
                type Base = APIGatewayProxyHandler;
                type Cognito = APIGatewayProxyWithCognitoAuthorizerHandler;
                type Authorizer = APIGatewayProxyWithLambdaAuthorizerHandler<Result>

                export { Base, Cognito, Authorizer };
            }
            namespace Event {
                type Base = APIGatewayProxyEvent;
                type Cognito = APIGatewayProxyWithCognitoAuthorizerEvent;

                interface Authorizer<Event = any> extends APIGatewayProxyWithLambdaAuthorizerEvent<Event> {}

                export { Base, Cognito, Authorizer };
            }
            namespace Context {
                type Base = import("aws-lambda").Context;
                export { Base };
            }

            export type { Handler, Event, Context };
        }

        export type { V1 };
    }

    export type { Handler };
}

export {};
export default Gateway;
export type { Gateway };
