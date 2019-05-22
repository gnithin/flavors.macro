# Flavors.macro

[![npm version](https://badge.fury.io/js/flavors.macro.svg)](https://badge.fury.io/js/flavors.macro)
[![Babel Macro](https://img.shields.io/badge/babel--macro-%F0%9F%8E%A3-f5da55.svg?style=flat-square)](https://github.com/kentcdodds/babel-plugin-macros)

Macro for building different flavors of an app by manipulating import headers. Built and tested in apps made with `create-react-app`.


## Description
`flavors.macro` is a `babel-plugin-macros`, which will build different flavors of a react-application. 

## Installation

```bash
# NPM
$ npm install --save-dev flavors.macro

# Yarn
$ yarn add flavors.macro
```

## Usage

### Flavors 
A placholder for a flavor, called a flavor-key, needs to be configured. This key can be used in the import statements in the app. Against this key, flavors can be added.

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
Here the the flavors-key is `layout-theme`. The current flavor being `green`.

If, for some reason, you cannot include the `.babel-plugin-macrosrc.json` file to your project, you can use any of the methods mentioned [here](https://github.com/kentcdodds/babel-plugin-macros/blob/master/other/docs/author.md#config-experimental).

You can then use the flavor-key in any class by adding the macro-key as the last element, in the name of the import string or just before the extension. Also make sure to call the `flavor()` function. In the below example, the flavor-key `layout-theme`, configured above, is being used - 
```js
import flavors from 'flavors.macro'
import Hello from './hello.layout-theme.js'
import Bye from './bye.layout-theme'
import Hi from './layout-theme/theme.js'
// ... other imports

// Add this right after all the imports are declared
flavors();
```
When the application is built, the above class will evaluate to -

```js
import Hello from './hello.green.js'
import Bye from './bye.green'
import Hi from './green/theme.js'
// ... other imports
```

NOTE: After adding/editing the configuration file(`.babel-plugin-macrosrc.json` or if any of the other equivalents being used), the npm server needs to be manually restarted.

Multiple flavor-keys can be added to the `flavorsMap`. If there are no flavor-keys, then a default key `defaultFlavor` is assumed, which will be replaced by an empty string.

### getFlavor
If the difference between flavors is really small/subtle or if there is already existing code, in which the flavors need to be created for a small portion of it, creating separate files for all of the different flavors can be cumbersome. 

The `getFlavor()` macro call-expression can be used to fetch the flavor for the corresponding flavor-key.

So for the configuration from the above examples - 
```js
import { getFlavor } from 'flavors.macro'

// ... Rest of the code
var currFlavor = getFlavor("layout-theme")
switch (currFlavor) {
    case "green":
        console.log("Using green flavor")
        break;
    case "red":
        console.log("Using red flavor")
        break;
    case "":
    default:
        console.log("No such flavor found")
}
```
`getFlavor` will return an empty string if the flavor-key is incorrect. 


## License
MIT. See license file
