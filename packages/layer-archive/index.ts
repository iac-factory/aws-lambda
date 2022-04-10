#!/usr/bin/env ts-node

import * as OS from "os";
import * as FS from "fs";
import * as Path from "path";
import * as Utility from "util";
import * as Process from "process";

import Archiver from "archiver";

const Exist = FS.existsSync;

/// Runtime Location; NPX := ~/.npm/_npx/{hash}/node_modules/{package}/index.ts
const Runtime = import.meta.url.replace( "file://", "" );

/// Current Working Directory
const CWD = process.cwd() ?? null;

const Initial = process.env["INIT_CWD"];

const Size = async (directory: string): Promise<{ Total: number, Statistics: FS.Stats[], Directories: {Total: number }, Files: { Objects: FS.Stats[], Total: number}, Entries: {Total: number} }> => {
    const Collection: { Total: number, Statistics: FS.Stats[], Directories: {Total: number }, Files: { Objects: FS.Stats[], Total: number}, Entries: {Total: number} } = { Total: 0, Statistics: [], Directories: {Total: 0}, Files: {Objects: [], Total: 0}, Entries: {Total: 0} };

    return new Promise(async (resolve) => {

        const $: string[] = await new Promise( ( resolve ) => {
            FS.readdir( directory, { encoding: "utf-8" }, ( error, files ) => {
                if ( error ) throw error;

                resolve( files );
            } );
        } );

        for await ( const iterator of $.map( ( file ) => {
            return new Promise( ( resolve ) => {
                FS.stat( Path.join( directory, file ), ( error, data ) => {
                    if ( error ) throw error;

                    Collection.Files.Total += 1;

                    resolve( data );
                } )
            } )
        } ) ) {
            const $: FS.Stats = iterator as FS.Stats;
            Collection.Statistics.push( $ );
        }

        Collection.Statistics.forEach( ( $ ) => {
            Collection.Total += ($.size * 1024 * 1024)
            if ($.isDirectory()) {
                Collection.Directories.Total += 1;
            }
        } );

        resolve(Collection);
    });
}

const Compress = async ( source: string, target: string ): Promise<Set<string>> => {
    const collection = (await Size(source));

    const internal = [Path.join(target, ".."), "node_modules"].join(Path.sep);
    const zip = [Path.join(target, ".."), "zip"].join(".");
    const difference = Object.values(Object.assign({}, source.split(Path.sep)));
    const index = difference.pop();
    const delta = difference.join(Path.sep);
    const relative = internal.replace(delta + "/", "");
    const normalize = Path.toNamespacedPath(Path.resolve(relative));

    const $ = { directory: collection.Total, files: {total: 0, filenames: []}, progress: { entries: {total: 0, process: 0}, global: {total: 0, process: 0}}, compression: {total: 0}};

    const data = await new Promise<{
        Path: string, Normalization: string, Module: string
    }[]>((resolve) => {
        const output = FS.createWriteStream( zip );

        const archive = Archiver.create( "zip", {
            zlib: { level: 9 }, comment: "AWS Lambda Function Node.js Archive", forceLocalTime: true
        } );

        output.on( "close", () => {
            console.log( "Total Byte(s)", "-", archive.pointer() );
        } );

        output.on( "end", () => {
            console.log( "Data Stream Successfully Drained" );
        } );

        archive.on( "warning", ( error ) => {
            throw error;
        } );

        archive.on( "error", ( error ) => {
            throw error;
        } );

        archive.on("entry", (entry) => {
            collection.Entries.Total += 1;
            $.files.total += 1;

            $.progress.entries.total += FS.statSync(entry.name).size;
            $.progress.entries.process += entry.stats.size;
            $.files.filenames.push(Path.toNamespacedPath(Path.resolve(entry.name)));
        });

        archive.on("data", (data) => {
            const length = Buffer.from(data).length;

            $.compression.total += length;

            /// console.debug("[Debug] Total Byte(s)", "-", $.compression.total);
        });

        archive.on("progress", (data) => {
            $.progress.global.process = data.fs.processedBytes;
            $.progress.global.total = data.fs.totalBytes;
        });

        // Pipe Archive data -> File
        archive.pipe( output );

        archive.directory(source, relative);

        archive.finalize().then(() => {
            resolve($.files.filenames.map(($) => {
                return {
                    Path: String($),
                    Normalization: String($).replace(normalize + Path.sep, ""),
                    Module: String(String($).replace(normalize + Path.sep, "")).split(Path.sep).filter(($) => $ !== "")[0]
                }
            }));
        });;
    });

    const modules = data.map(($) => $.Module);

    return new Set( modules );
};

/***
 * Promisified Version of {@link FS.cp}
 * ---
 *
 * Asynchronously copies the entire directory structure from source to destination, including subdirectories and files.
 * - When copying a directory to another directory, globs are not supported.
 *
 * @experimental
 *
 * @param source {typeof import("fs").PathOrFileDescriptor} source path to copy.
 * @param target {typeof import("fs").PathOrFileDescriptor} destination path to copy to.
 * @returns {Promise<?>}
 *
 * @constructor
 *
 */

const Main = async ( source: string, target: string ): Promise<{array: string[], total: number} | void> => {
    const $ = async (): Promise<string> => await new Promise( ( resolve ) => {
        FS.cp( source, target, {
                recursive: true,
                dereference: true,
                preserveTimestamps: false,
                errorOnExist: false,
                force: true
            }, () => {
                resolve(target )
            }
        );
    } );

    await $().then(async () => {
        const modules = await Compress(source, Path.join(target, "..", "nodejs.zip"));
        const array = [... modules];
        const total = modules.size;

        console.log({
            "Node-Module(s)": array, Total: total
        });
    });
};

const Arguments = Process.argv.splice( 2 );

const Debug = Arguments.includes( "--debug" );
const Source = ( Arguments.includes( "--source" ) ) ? Arguments[Arguments.indexOf( "--source" ) + 1] ?? null : null;
const Target = ( Arguments.includes( "--target" ) ) ? Arguments[Arguments.indexOf( "--target" ) + 1] ?? null : null;

( async () => {
    console.log("[Log] Running Lambda-Layer Archiving Tool ...");
    const source = Path.join( Initial ?? CWD, "node_modules" );
    const target = Path.join( Initial ?? CWD, "nodejs", "node_modules" );

    ( Debug ) && console.debug( "[Debug] Source Path", "\t", ":=", source );
    ( Debug ) && console.debug( "[Debug] Target Path", "\t", ":=", target );

    if ( Exist( source ) === false ) {
        console.warn( "[Warning] Error Locating Directory Path", ":=", source );
        throw Error( "Package's \"node_modules\" Directory Doesn't Exist" );
    }

    await Main( source, target );
} )();

export {};
