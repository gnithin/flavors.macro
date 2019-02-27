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
        var limit = Constants.EXPRESSION_TRAVERSE_LIMIT;
        var currPath = referencePath;
        while (limit > 0 && currPath != null && currPath.type !== "ExpressionStatement") {
            currPath = currPath.parentPath;
            limit -= 1;
        }

        if (Utils.isEmptyStr(currPath)) {
            throw new Error(
                `The macro should be used as an expressions statement! 
                Eg - flavors()`
            );
        } else if (limit <= 0) {
            throw new Error("The macro should be used at the global scope. Cannot be nested. Cannot find the ExpressionStatement!")
        }

        var expPath = currPath;
        var currRefIndex = expPath.key;

        var bodyList = null;
        try {
            bodyList = expPath.parentPath.node.body;
        } catch (e) {
            throw new Error("Error fetching the macro-expression statement's parent-node - ", e)
        } finally {
            if (Utils.isNull(bodyList)) {
                throw new Error("The macro-expression statement's parent-node does not contain any body")
            }
        }

        // Iterate through every element from the top until the macro expression is reached
        for (var i = 0; i < currRefIndex; i++) {
            var entry = bodyList[i];

            // Skip the non-import declaration
            if (entry.type !== "ImportDeclaration") {
                continue;
            }

            var importVal = entry.source.value;
            if (false === /^.+\.default(\.js)?$/.test(importVal)) {
                console.log("Skipping ", importVal);
                continue;
            }

            console.log("Processing - ", importVal);
            importVal = importVal.replace(/\.default/, `.${Constants.THEME}`);
            console.log("New val - ", importVal);

            // Add the updated import-value
            entry.source.value = importVal;
            entry.source.extra.rawValue = importVal;
            entry.source.extra.raw = `'${importVal}'`;
        }

        // Remove the macro expression
        expPath.remove();
    })
}

export default createMacro(flavors)