/***
 * File Type
 * ---------
 * ...
 *
 * @Task Implement Workable Class
 *
 */

class File implements Type {
    /*** */
    name?: string | null;

    /*** */
    volume?: boolean | null;

    /*** */
    pipe?: boolean | null;

    /*** */
    ephemeral?: boolean | null;

    /*** */
    file?: boolean | null;

    /*** */
    socket?: boolean | null;

    /*** */
    link?: boolean | null;

    /*** */
    directory?: boolean | null;

    constructor() {
        this.name = null;
        this.volume = null;
        this.pipe = null;
        this.ephemeral = null;
        this.file = null;
        this.socket = null;
        this.link = null;
        this.directory = null;
    }
}

interface Type {
    name?: string | null;
    volume?: boolean | null;
    pipe?: boolean | null;
    ephemeral?: boolean | null;
    file?: boolean | null;
    socket?: boolean | null;
    link?: boolean | null;
    directory?: boolean | null;
}

export { File };
export type { Type };

export default File;

module.exports = { File };
