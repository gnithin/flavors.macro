export default class Utils {
    static isNull(obj) {
        return (typeof (obj) === "undefined" || obj === null)
    }

    static isEmptyStr(obj) {
        return (this.isNull(obj) || obj === "");
    }

    static isEmptyObj(obj) {
        return this.isNull(obj) || Object.entries(obj).length === 0
    }

    /**
     * Escape regex related symbols from string.
     * NOTE: Picked up from here - https://stackoverflow.com/a/6969486/1518924
     * Can't believe JS does not have an in-built method for this. Scratch that, I can really believe that :p
     * @param {string}
     * @returns {string}
     */
    static escapeRegExp(str) {
        if (typeof str !== "string") {
            return str
        }
        return str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
    }
}