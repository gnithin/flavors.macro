import Constants from './constants'
import Utils from './utils';

export default class Processor {
    /**
     * Modify the input string val to the appropriate flavor.
     * If the input cannot be modified, then it would not contain the keyword required for replacement.
     * The return value dictates when it is modified.
     * @param {string} importVal 
     * @param {object|null} config 
     * @returns {object} {isModified: <bool>, importVal: <string>}
     */
    static modifyImportStatement(importVal, config) {
        var resp = {
            isModified: false,
            importVal: importVal,
        }

        if (Utils.isNull(importVal)) {
            return resp
        }

        // Fetch the flavor-map
        var flavorMap = Processor.getFlavorMapForConfig(config)

        // Import statement logic
        var isMatched = false;
        var replacementVal = null;
        var matchedKey = null;
        let matchedPathChar = null;
        for (var flavorKey in flavorMap) {
            if (false === flavorMap.hasOwnProperty(flavorKey)) {
                continue
            }

            var isDefaultRegex = new RegExp(`^.+([./])${Utils.escapeRegExp(flavorKey)}(?:([./]).+)?$`)
            if (true === isDefaultRegex.test(importVal)) {
                isMatched = true;
                matchedKey = flavorKey
                replacementVal = flavorMap[matchedKey]
                matchedPathChar = importVal.match(isDefaultRegex)[1]
                break;
            }
        }

        // Return if no entry matches
        if (false === isMatched || Utils.isNull(replacementVal)) {
            return resp;
        }

        /*
            NOTE: If replacement is an empty string, then don't add the additional period.
            For example -
            <replacement-val> => <replaced-string>
            "green" => abc.green.js
            "" => abc.js
        */
        if (replacementVal !== "") {
            replacementVal = `${matchedPathChar}${replacementVal}`
        }
        var defaultReplaceRegex = new RegExp(`[./]${Utils.escapeRegExp(matchedKey)}\\b`)
        importVal = importVal.replace(defaultReplaceRegex, `${replacementVal}`);


        // Setting up the final response
        resp.isModified = true;
        resp.importVal = importVal;

        return resp;
    }

    /**
     * Returns flavor for key. If key is invalid or not found, returns "" (empty-string)
     * @param {string} key 
     * @param {*} config 
     * @returns {string}
     */
    static getFlavorForKey(key, config) {
        var defaultFlavorVal = "";
        if (Utils.isEmptyStr(key)) {
            return defaultFlavorVal
        }

        var flavorMap = Processor.getFlavorMapForConfig(config)
        if (Utils.isEmptyObj(flavorMap)) {
            return defaultFlavorVal
        }

        var flavorVal = flavorMap[key]
        if (Utils.isEmptyObj(flavorVal)) {
            return defaultFlavorVal
        }
        return flavorVal
    }

    /**
     * Creates a flavor map from the config. 
     * If the config is empty, creates a flavor-map with default values.
     * @param {object} config 
     */
    static getFlavorMapForConfig(config) {
        // Fetch the flavor-map
        var flavorMap = null;
        if (false === Utils.isEmptyObj(config)) {
            flavorMap = config[Constants.CONFIG_FLAVOR_MAP_KEY]
        }

        // Only if the flavor-map is empty is when the default flavors are applied
        // NOTE: If default needs to be avoided, then set flavorsMap: {}
        if (Utils.isNull(flavorMap)) {
            flavorMap = {
                [Constants.DEFAULT_FLAVOR_KEY]: Constants.DEFAULT_FLAVOR_THEME,
            }
        }
        return flavorMap
    }
}