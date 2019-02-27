import Constants from './constants'

export default class Processor {
    /**
     * 
     * @param {string} importVal 
     * @param {object|null} config 
     * @returns {object} {isModified: <bool>, importVal: <string>}
     * 
     */
    static modifyImportStatement(importVal, config) {
        var resp = {
            isModified: false,
            importVal: importVal,
        }

        var defaultKey = Constants.DEFAULT_FLAVOR_KEY;
        // TODO: Escape the regex 
        var isDefaultRegex = new RegExp(`^.+\\.${defaultKey}(\\.js)?$`)
        if (false === isDefaultRegex.test(importVal)) {
            console.log("Skipping ", importVal);
            return resp;
        }

        var replacementVal = Constants.DEFAULT_FLAVOR_THEME;
        console.log("Processing - ", importVal);

        // TODO: Escape the regex 
        var defaultReplaceRegex = new RegExp(`\\.${defaultKey}\\b`)
        importVal = importVal.replace(defaultReplaceRegex, `.${replacementVal}`);

        console.log("Processed - ", importVal);

        resp.isModified = true;
        resp.importVal = importVal;
        return resp;
    }
}