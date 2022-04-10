/***
 * @example
 * import { Binary } from "./abi";
 *
 * /// Search for `git` ABI
 * const example = () => {
 *     console.log(Binary("git"));
 * }
 *
 * example();
 */

import * as FS from "fs";
import * as Path from "path";
import * as Process from "process";

/*** @private */
function $(bin: string | FS.PathLike) {
    return ( Process.env.PATH || "" ).replace( /["]+/g, "" ).split( Path.delimiter ).map( (chunk) => {
        return ( Process.env.PATHEXT || "" ).split( Path.delimiter ).map( (ext) => {
            return Path.join( chunk, bin + ext );
        } );
    } ).reduce( (a, b) => {
        return a.concat( b );
    } );
}

const Binary = (bin: string | FS.PathLike) => {
    const Data = { Valid: false, Path: "" };
    const Target = $( bin );
    const Iterator = Target.length;

    let i = 0;
    for ( i; i <= Iterator; i++ ) {
        try {
            if ( FS.statSync( Target[ i ] )?.isFile() ) {
                Data.Valid = true;
                Data.Path = Target[ i ];

                break;
            }
        } catch ( e ) {
            /// throw e;
        }
    }

    return Data.Valid;
};

export { Binary };

export default { Binary };

module.exports = { Binary };
