# Flavors.macro
Macro for buiding different flavors of an app by manipulating import headers in React.

## Description
`flavors.macro` is a `babel-plugin-macros`, which allows us to build different flavors/themes of a react-application.

## Installation

```
# NPM
npm install --save-dev flavors.macro

# Yarn
yarn add flavors.macro
```

## Usage
Add the following into your app's `package.json`
```json
{
    // ...
    "babelMacros": {
        "flavorsConfig": {
            "flavorsMap": {
                // Specify all the types of keys here
                "layout-theme": "green",
            }
        }
    }
}
```

Then you can use it in the file
```js
import flavors from 'flavors.macro'
import Hello from './hello.layout-theme'
// ... other imports

// Add this right after all the imports are declared
flavors();
```

which will be built to -
```js
import Hello from './hello.green'
// ... other imports
```

## License
MIT. See license file