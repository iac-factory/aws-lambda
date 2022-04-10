/***
 * Much like a {@link Header} type, the Path-Parameter type
 * can be described as a variable string found in the URI
 * of a HTTP request.
 *
 * However, the much more important *distinction* between
 * the `Header` vs `Parameter` types is the assignment;
 * the assignment that of a `Parameter` is always, and specifically,
 * equal to `unknown` - the value will always be of type `string`.
 *
 * Additionally, the key will include a `"{"` as a prefix, and
 * a `"}"` as the suffix.
 *
 * @example
 * const $ = "/api/{variable}/endpoint";
 *
 * @type {Parameter}
 */

interface Parameter {
    [$: string]: string | undefined;
}

/***
 * An array of {@link Parameter}
 */

interface Parameters {
    [name: string]: string | undefined;
}

declare namespace HTTP {
    export type { Parameter };
    export type { Parameters };
}

export {};
export default {};
export type { HTTP, Parameter, Parameters};
