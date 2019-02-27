import Constants from './constants'
import Utils from './utils'

import { createMacro } from 'babel-plugin-macros'

function flavors({ references, state, babel }) {
    const { default: defaultImport = [] } = references;

    defaultImport.forEach(referencePath => {
        if (Utils.isNull(referencePath)) {
            throw new Error("The reference path for the macro is empty!")
        }

        // Traverse through sibling and filter out the import-declarations
        // Depending on the type of value, find the expression
        // Not sure if while is the best way to go about this
        var currPath = referencePath;
        while (currPath != null && currPath.type !== "ExpressionStatement") {
            currPath = currPath.parentPath;
        }
        if (Utils.isEmptyStr(currPath)) {
            throw new Error(
                `The macro should be used as an expressions statement! 
         Eg - macro(), __macro__`
            );
        }

        var expPath = currPath;
        var currRefIndex = expPath.key;
        var bodyList = expPath.parentPath.node.body;

        // Iterate through every element in the body until
        for (var i = 0; i < currRefIndex; i++) {
            var entry = bodyList[i];
            // skip the import declaration
            if (entry.type !== "ImportDeclaration") {
                continue;
            }
            var importVal = entry.source.value;
            if (false === /^.+\.default(\.js)?$/.test(importVal)) {
                console.log("Skipping ", importVal);
                continue;
            } else {
                console.log("Processing - ", importVal);
            }
            importVal = importVal.replace(/\.default/, `.${Constants.THEME}`);
            console.log("New val - ", importVal);

            // Check if ending with `default.js`
            entry.source.value = importVal;
            entry.source.extra.rawValue = importVal;
            entry.source.extra.raw = `'${importVal}'`;
        }

        // Remove the macro expression
        expPath.remove();
    })
}

export default createMacro(flavors)