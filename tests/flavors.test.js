const pluginTester = require('babel-plugin-tester')
const plugin = require("babel-plugin-macros");

pluginTester({
    plugin,
    snapshot: false,

    babelOptions: { filename: __filename },
    tests: [
        {
            code: `
                import flavors from '../src/macro.js'
                import a from './filename'
                import b from './filename-flavor.default'

                flavors();
            `,
            output: `
                import a from './filename';
                import b from './filename-flavor.green';
            `
        },
        {
            code: `
            import flavors from '../src/macro.js'
            import React, { Component } from 'react';
            import Hello from './hello.default.js'

            flavors()
            `,
            output: `
            import React, { Component } from 'react';
            import Hello from './hello.green.js';
            `
        }
    ],
})
