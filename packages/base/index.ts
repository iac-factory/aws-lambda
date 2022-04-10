import Path from "path";

import { Function } from "./lambda/index.js";

import type { HTTP } from "./types/index.js";
import type { Lambda } from "./types/index.js";

/***
 * The Current Runtime Module without the local `"file://"` in the URI
 *
 * @private
 *
 * @type string - The Runtime Module's Path
 *
 */

const $: string = import.meta.url.replace( "file://", "" );

/*** The Resolved Current-Working-Directory */
const CWD: string = Path.resolve(Path.dirname($));

export * from "./main.js";

export { Function };

export type { HTTP };
export type { Lambda };

export default { CWD };
