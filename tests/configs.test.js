import Processor from '../src/processor'

const SAMPLE_CONFIG = {
    "flavorsMap": {
        "default": "green",
        "layout": "red",
    }
}

const IP_KEY = "ip"
const CONFIG_KEY = "config"
const EXPECTED_KEY = "expected"
const EXPECTED_MODIFIED_KEY = "expected_modified"

it('Empty config test', () => {
    var ipList = [
        {
            [IP_KEY]: "abc.default.js",
            [EXPECTED_KEY]: "abc.green.js",
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
