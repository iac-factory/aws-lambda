type Single = string;

type Header = { [Name: string]: Single };

/***
 * A variable amount of {@link Header} type(s)
 *
 * @type {Header | [Header]}
 */
interface Variable {
    [name: string]: string | undefined;
}

/***
 * A special type of the {@link Header} type that AWS interfaces (does not implement),
 * and describes as a Header, where the value assignment is of
 * more than a single string, potentially of other type(s), too.
 */
interface Dynamic{
    [name: string]: string[] | undefined;
}

declare namespace HTTP {
    export type { Header };
    export type { Dynamic };
    export type { Variable };
}

export {};
export default HTTP;
export type { HTTP };
