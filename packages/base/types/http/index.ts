import type { HTTP as Methods } from "./method.js";
import type { HTTP as Headers } from "./headers.js";
import type { HTTP as Path } from "./path.js";
import type { HTTP as Query } from "./query.js";

declare namespace HTTP {
    export type { Methods };
    export type { Headers };
    export type { Path };
    export type { Query };
}

export default HTTP;

export type { HTTP };
