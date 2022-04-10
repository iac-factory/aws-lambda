/// @ts-ignore
type Reference = import("./headers.js").HTTP.Dynamic;

/***
 * Much like the {@link Header} and {@link Parameter} type(s),
 * the `Queryparameter` type can be described as a variable string
 * found in the URI, following the `endpoint` + `"?"` of a HTTP request.
 *
 * @example
 * const $ = "/api/endpoint?queryparameter=value";
 *
 * @type {Parameter}
 */

type Queryparameter = { [$: string]: string };

/***
 * An array of {@link Parameter}
 */

interface Queryparameters {
    [name: string]: string | undefined;
}

/***
 * Similar to the {@link Header Header's} {@link Reference Dynamic} type,
 * `Dynamic` is a special type of the {@link Queryparameter} type that AWS
 * interfaces (does not implement), and describes as a `Queryparameter`, where
 * the value assignment is of more than a single string, potentially of other type(s), too.
 */

interface Dynamic {
    [name: string]: string[] | undefined;
}

declare namespace HTTP {
    /// Explicitly set to `Parameter` to stay consistent
    /// with the `path` ESM module.
    export type { Queryparameter as Parameter };
    /// Explicitly set to `Parameters` to stay consistent
    /// with the `path` ESM module.
    export type { Queryparameters as Parameters };
    export type {Dynamic};
}

export {};
export default HTTP;
export type { HTTP };
