const { createMacro } = require('babel-plugin-macros')
const THEME = "green";

module.exports = createMacro(flavors)

function flavors({ references, state, babel }) {
    const { default: defaultImport = [] } = references;

    defaultImport.forEach(referencePath => {
        // Traverse through sibling and filter out the import-declarations
        // TODO: Validate this :p
        // Depending on the type of value, find the expression
        var currPath = referencePath;
        // Not sure if while is the best way to go about this
        while (currPath != null && currPath.type !== "ExpressionStatement") {
            currPath = currPath.parentPath;
        }
        // TODO: Check for undefined as well
        if (currPath === null) {
            throw new Error(
                `The macro should be used as an expressions statement! 
         Eg - macro(), __macro__
		`
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
            importVal = importVal.replace(/\.default/, `.${THEME}`);
            console.log("New val - ", importVal);

            // Check if ending with `default.js`
            entry.source.value = importVal;
            entry.source.extra.rawValue = importVal;
            entry.source.extra.raw = `'${importVal}'`;
        }

        // TODO: Remove the macro expression
        expPath.remove();
    })
}
