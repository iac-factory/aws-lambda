import type { Lambda } from "ts-lambda";

type Event = Lambda.Gateway.Handler.V1.Event.Base;
type Context = Lambda.Gateway.Handler.V1.Context.Base;
type Gateway = Lambda.Handler.Response["ReSTful"];

type Response = Promise<Gateway>;

/***
 * The AWS Lambda Function - Primary Entry Point
 *
 * @param {Event} event
 * @param {Context} context
 * @returns {Response}
 */
const handler: Lambda.Handler.Base = async ( event?: Event, context?: Context ): Response => {
    const data = JSON.stringify( event, null, 4 );

    return { statusCode: 200, body: data };
};

export { handler };
export default { handler };
export type { Event, Context };
