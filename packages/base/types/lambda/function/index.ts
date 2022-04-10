import type { Event } from "./event.js";
import type { Context } from "./context.js";

/***
 * The Lambda-Function Namespace
 * ---
 *
 * While it may be confusing or in question the usage of a
 * declarative namespace, this is to avoid global clashing of
 * `type`s, `variable`s, and `interfaces`s.
 *
 * @public
 * @namespace
 * @experimental
 *
 */

declare namespace Function {
    export type { Event };
    export type { Context };
}

export {};
export default Function;
export type { Function };
