# Flavors.macro

[![Babel Macro](https://img.shields.io/badge/babel--macro-%F0%9F%8E%A3-f5da55.svg?style=flat-square)](https://github.com/kentcdodds/babel-plugin-macros)

Macro for buiding different flavors of an app by manipulating import headers. Built and tested in apps made with `create-react-app`.

## Description
`flavors.macro` is a `babel-plugin-macros`, which will build different flavors of a react-application. This

## Installation

```bash
# NPM
$ npm install --save-dev flavors.macro

# Yarn
$ yarn add flavors.macro
```

## Usage
Add the following into the `.babel-plugin-macrosrc.json` at the root of the project.
```json
{
    "babelMacros": {
        "flavorsConfig": {
            "flavorsMap": {
                "layout-theme": "green",
            }
        }
    }
}
```

If, for some reason, you cannot include the `.babel-plugin-macrosrc.json` file to your project, you can use any of the methods mentioned [here](https://github.com/kentcdodds/babel-plugin-macros/blob/master/other/docs/author.md#config-experimental).

You can then use the flavor-key any class, like this 
```js
import flavors from 'flavors.macro'
import Hello from './hello.layout-theme'
// ... other imports

// Add this right after all the imports are declared
flavors();
```

which will evaluate to -

```js
import Hello from './hello.green'
// ... other imports
```

## License
MIT. See license file
