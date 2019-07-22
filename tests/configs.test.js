import Processor from '../src/processor'
import CONSTANTS from '../src/constants';

const IP_KEY = "ip"
const CONFIG_KEY = "config"
const EXPECTED_KEY = "expected"
const EXPECTED_MODIFIED_KEY = "expected_modified"

it('Empty config test', () => {
    var ipList = [
        {
            [IP_KEY]: "abc.defaultFlavor.js",
            [EXPECTED_KEY]: "abc.js",
            [EXPECTED_MODIFIED_KEY]: true,
        },
        {
            [IP_KEY]: "abc.DEFAULT.js",
            [EXPECTED_KEY]: "abc.DEFAULT.js",
            [EXPECTED_MODIFIED_KEY]: false,
        },
        {
            [IP_KEY]: "abc.defaultFlavor.css",
            [EXPECTED_KEY]: "abc.css",
            [EXPECTED_MODIFIED_KEY]: true,
        },
        {
            [IP_KEY]: "abc",
            [EXPECTED_KEY]: "abc",
            [EXPECTED_MODIFIED_KEY]: false,
        },
        {
            [IP_KEY]: null,
            [EXPECTED_KEY]: null,
            [EXPECTED_MODIFIED_KEY]: false,
        },
    ]

    ipList.forEach(entry => {
        var { isModified, importVal } = Processor.modifyImportStatement(entry[IP_KEY])
        if (importVal !== entry[EXPECTED_KEY]) {
            throw `Expected ${entry[EXPECTED_KEY]}, but got ${importVal} for input - ${entry[IP_KEY]}`
        } else if (isModified !== entry[EXPECTED_MODIFIED_KEY]) {
            throw `Expected is-modified to be ${entry[EXPECTED_MODIFIED_KEY]}, but got ${isModified} for input - ${entry[IP_KEY]}`
        }
    })
});

it('Config test', () => {
    const flavorConfig = {
        "flavorsMap": {
            "styleFlavor": "green",
            "layoutFlavor": "red",
            "flavor.with-spl#chars": "not-new-flavor",
        }
    }

    var ipList = [
        {
            [IP_KEY]: "abc.styleFlavor.js",
            [EXPECTED_KEY]: "abc.green.js",
            [CONFIG_KEY]: flavorConfig,
            [EXPECTED_MODIFIED_KEY]: true,
        },
        {
            [IP_KEY]: "abc.layoutFlavor.js",
            [EXPECTED_KEY]: "abc.red.js",
            [CONFIG_KEY]: flavorConfig,
            [EXPECTED_MODIFIED_KEY]: true,
        },
        {
            [IP_KEY]: "abc.something-else.js",
            [EXPECTED_KEY]: "abc.something-else.js",
            [CONFIG_KEY]: flavorConfig,
            [EXPECTED_MODIFIED_KEY]: false,
        },
        {
            [IP_KEY]: "abc.flavor.with-spl#chars.js",
            [EXPECTED_KEY]: "abc.not-new-flavor.js",
            [CONFIG_KEY]: flavorConfig,
            [EXPECTED_MODIFIED_KEY]: true,
        },
        // Check for without .js
        {
            [IP_KEY]: "abc.flavor.with-spl#chars",
            [EXPECTED_KEY]: "abc.not-new-flavor",
            [CONFIG_KEY]: flavorConfig,
            [EXPECTED_MODIFIED_KEY]: true,
        },
        // Check for replacing flavor with only the boundary values
        {
            [IP_KEY]: "abc.flavor.with-spl#charstrailing.js",
            [EXPECTED_KEY]: "abc.flavor.with-spl#charstrailing.js",
            [CONFIG_KEY]: flavorConfig,
            [EXPECTED_MODIFIED_KEY]: false,
        },
        // Check for replacing flavor with values other than periods
        {
            [IP_KEY]: "abc.flavor.with-spl#chars#trailing.js",
            [EXPECTED_KEY]: "abc.flavor.with-spl#chars#trailing.js",
            [CONFIG_KEY]: flavorConfig,
            [EXPECTED_MODIFIED_KEY]: false,
        },
        // Check with empty config map
        {
            [IP_KEY]: "abc.defaultFlavor.js",
            [EXPECTED_KEY]: "abc.js",
            [CONFIG_KEY]: {},
            [EXPECTED_MODIFIED_KEY]: true,
        },
        // Check with empty config map
        {
            [IP_KEY]: "abc.defaultFlavor.js",
            [EXPECTED_KEY]: "abc.defaultFlavor.js",
            [CONFIG_KEY]: {
                "flavorsMap": {}
            },
            [EXPECTED_MODIFIED_KEY]: false,
        },
        // Directory flavors
        {
            [IP_KEY]: "abc/styleFlavor/theme.js",
            [EXPECTED_KEY]: "abc/green/theme.js",
            [CONFIG_KEY]: flavorConfig,
            [EXPECTED_MODIFIED_KEY]: true,
        },
        {
            [IP_KEY]: "abc/constants.layoutFlavor/theme.js",
            [EXPECTED_KEY]: "abc/constants.red/theme.js",
            [CONFIG_KEY]: flavorConfig,
            [EXPECTED_MODIFIED_KEY]: true,
        },
        // The reversed-flavors should also work
        {
            [IP_KEY]: "abc/layoutFlavor.constants/theme.js",
            [EXPECTED_KEY]: "abc/red.constants/theme.js",
            [CONFIG_KEY]: flavorConfig,
            [EXPECTED_MODIFIED_KEY]: true,
        },
    ]

    ipList.forEach(entry => {
        var { isModified, importVal } = Processor.modifyImportStatement(entry[IP_KEY], entry[CONFIG_KEY])
        if (importVal !== entry[EXPECTED_KEY]) {
            throw `Expected ${entry[EXPECTED_KEY]}, but got ${importVal} for input - ${entry[IP_KEY]}`
        } else if (isModified !== entry[EXPECTED_MODIFIED_KEY]) {
            throw `Expected is-modified to be ${entry[EXPECTED_MODIFIED_KEY]}, but got ${isModified} for input - ${entry[IP_KEY]}`
        }
    })
});

it('Config test for getFlavorForConfig', () => {
    const flavorConfig = {
        "flavorsMap": {
            "styleFlavor": "green",
            "layoutFlavor": "red",
        }
    }

    // This is so that the empty-string from not matching must not match the 
    // default-empty-string value for default-flavor. This will make it non-ambiguous.
    var tempFlavorTheme = "temp"
    CONSTANTS.DEFAULT_FLAVOR_THEME = tempFlavorTheme

    var ipList = [
        {
            [IP_KEY]: "styleFlavor",
            [EXPECTED_KEY]: "green",
            [CONFIG_KEY]: flavorConfig,
        },
        {
            [IP_KEY]: "layoutFlavor",
            [EXPECTED_KEY]: "red",
            [CONFIG_KEY]: flavorConfig,
        },
        {
            [IP_KEY]: "incorrect-flav",
            [EXPECTED_KEY]: "",
            [CONFIG_KEY]: flavorConfig,
        },
        {
            [IP_KEY]: "styleFlavor",
            [EXPECTED_KEY]: "",
            [CONFIG_KEY]: null,
        },
        {
            [IP_KEY]: CONSTANTS.DEFAULT_FLAVOR_KEY,
            [EXPECTED_KEY]: tempFlavorTheme,
            [CONFIG_KEY]: null,
        },
    ]

    ipList.forEach(entry => {
        var flavorVal = Processor.getFlavorForKey(entry[IP_KEY], entry[CONFIG_KEY])
        if (flavorVal !== entry[EXPECTED_KEY]) {
            throw `Expected ${entry[EXPECTED_KEY]}, but got ${flavorVal} for input - ${entry[IP_KEY]}`
        }
    })
});