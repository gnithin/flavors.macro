const { createMacro, MacroError } = require('babel-plugin-macros')

module.exports = createMacro(importFlavorMacro)

function importFlavorMacro({ references, state, babel }) {
    const { default: defaultImport = [] } = references;

    defaultImport.forEach(referencePath => {
        // Traverse through sibling and filter out the import-declarations
        // TODO: Validate this :p
        console.log("HI!!!![]")
    })
}
