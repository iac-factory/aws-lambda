/***
 * **File System Walker(s)**
 *
 * @example
 * import { Walk, Walker } from "./walk";
 *
 * /// Callback Example
 * const example = async () => {
 *     await Walk(process.cwd(), (error: Error | null, results: string[]) => {
 *         console.log(error, results);
 *     });
 * };
 *
 * await example();
 *
 * @example
 * import { Walk, Walker } from "./walk";
 *
 * /// Promise Example
 * const example = async () => console.log(await Walker(process.cwd()));
 *
 * await example();
 *
 */

import * as FS from "fs";
import * as Path from "path";
import * as Utility from "util";

import { Stats } from "fs";

/***
 * File-System Walker
 *
 * There are two types of runtime loops in an asynchronous-based environment:
 * - ***serial***
 * - ***parallel***
 *
 * A serial loop waits for one iteration to complete before it moves onto the next iteration - guarantees that every iteration of the loop completes in order.
 *
 * In a parallel loop, all the iterations are started at the same time, and one may complete before another; however, parallel loops are much faster than serial loops.
 *
 * The following implementation elects the ***Parallel*** type.
 *
 * @param {string} directory
 * @param {Function} callback
 */
const Walk = ( directory: string, callback: Function ) => {
    let $: string[] = [];
    FS.readdir( directory, function ( error: Error | null, list: string[] ) {
        if ( error ) return callback( error );
        let pending = list.length;

        if ( !pending ) return callback( null, $ );

        list.forEach( function ( file ) {
            file = Path.resolve( directory, file );
            FS.stat( file, function ( error: Error | null, stat: Stats ) {
                if ( error ) { /*** ENOENT - Ignore */ }
                if ( stat && stat.isDirectory() ) {
                    Walk( file, function ( error: Error | null, response: string ) {
                        if ( error ) { /*** ENOENT - Ignore */ }

                        $ = $.concat( response );
                        if ( !--pending ) callback( null, $ );
                    } );
                } else {
                    $.push( file );

                    if ( !--pending ) callback( null, $ );
                }
            } );
        } );
    } );
};

/***
 * ***Walk*** Promise Wrapper
 *
 * @augments Walk
 *
 * @type {(directory: string) => Promise<string[]}
 *
 * @see {@link Walk}
 *
 */
const Walker: ( directory: string ) => Promise<string[]> = Utility.promisify( Walk );

export { Walk, Walker };

export default { Walker };

module.exports = { Walker };
