import type { Handler } from "./handler/index.js";
import type { Function } from "./function/index.js";
import type { Gateway } from "./api-gateway/index.js";

/***
 * The Lambda Namespace
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

declare namespace Lambda {
    export type { Function };
    export type { Handler };
    export type { Gateway };
}

export {};
export type { Lambda };
export default { Lambda };
