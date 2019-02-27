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
}