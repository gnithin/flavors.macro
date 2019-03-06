const pluginTester = require('babel-plugin-tester')
const plugin = require("babel-plugin-macros");

pluginTester({
    plugin,
    snapshot: false,
    babelOptions: { filename: __filename },
    tests: [
        {
            code: `
                import flavors from '../../src/macro.js'
                import a from './filename'
                import b from './filename-flavor.layout-theme.js'

                flavors();
            `,
            output: `
                import a from './filename';
                import b from './filename-flavor.green.js';
            `
        },
        {
            code: `
                import {getFlavor} from '../../src/macro.js'
                var val = getFlavor("layout-theme") === "red"
            `,
            output: `
                var val = "green" === "red";
            `
        },
    ],
})
