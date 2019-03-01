import Constants from './constants'
import Utils from './utils'

import { createMacro, MacroError } from 'babel-plugin-macros'
import Processor from './processor'

/*
The basic AST logic - 
https://astexplorer.net/#/gist/3d66740ae62d8a324881d0ed3b47b803/529c309b805a3017e2103900155b05d9cb72c912
*/
function flavors({ references, state, babel, config }) {
    const { default: defaultImport = [] } = references;

    defaultImport.forEach(referencePath => {
        if (Utils.isNull(referencePath)) {
            throw new MacroError("The reference path for the macro is empty!")
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
            throw new MacroError(
                `The macro should be used as an expressions statement! 
                Eg - flavors()`
            );
        } else if (limit <= 0) {
            throw new MacroError("The macro should be used at the global scope. Cannot be nested. Cannot find the ExpressionStatement!")
        }

        var expPath = currPath;
        var currRefIndex = expPath.key;

        var bodyList = null;
        try {
            bodyList = expPath.parentPath.node.body;
        } catch (e) {
            throw new MacroError("Error fetching the macro-expression statement's parent-node - ", e)
        } finally {
            if (Utils.isNull(bodyList)) {
                throw new MacroError("The macro-expression statement's parent-node does not contain any body")
            }
        }

        // Iterate through every element from the top until the macro expression is reached
        for (var i = 0; i < currRefIndex; i++) {
            var entry = bodyList[i];

            // Skip the non-import declaration
            if (entry.type !== "ImportDeclaration") {
                continue;
            }

            // Modify import value
            var importVal = entry.source.value;

            // Fetch from config
            var { isModified, importVal } = Processor.modifyImportStatement(importVal, config)
            if (false === isModified) {
                continue
            }

            // Add the updated import-value
            entry.source.value = importVal;
            entry.source.extra.rawValue = importVal;
            entry.source.extra.raw = `'${importVal}'`;
        }

        // Remove the macro expression
        expPath.remove();
    })
}

export default createMacro(
    flavors,
    { configName: Constants.CONFIG_NAME },
)