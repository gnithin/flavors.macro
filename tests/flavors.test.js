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
                import b from './filename-flavor.defaultFlavor'

                flavors();
            `,
            output: `
                import a from './filename';
                import b from './filename-flavor';
            `
        },
        {
            code: `
            import flavors from '../src/macro.js'
            import React, { Component } from 'react';
            import Hello from './hello.defaultFlavor.js'

            flavors()
            `,
            output: `
            import React, { Component } from 'react';
            import Hello from './hello.js';
            `
        },
        {
            code: `
            import {getFlavor} from '../src/macro.js'
            var flavor = getFlavor("defaultFlavor");
            `,
            output: `
            var flavor = "";
            `
        }
    ],
})
