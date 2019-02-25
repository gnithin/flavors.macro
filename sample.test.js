const pluginTester = require('babel-plugin-tester')
const plugin = require("babel-plugin-macros");

pluginTester({
    plugin,
    snapshot: true,

    babelOptions: { filename: __filename },
    tests: [
        `
      import flavors from './flavors'
      flavors();
    `,
    ],
})
