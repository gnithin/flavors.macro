import Processor from '../src/processor'

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
            "stylesFlavor": "green",
            "layoutFlavor": "red",
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