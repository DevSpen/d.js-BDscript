const data = require("../main/data");
const Function = require("../structures/Function");

module.exports = new Function({
    name: "$isBoolean",
    description: "checks whether given input is a boolean type (on/off, true/false, enable/disable yes/no).",
    brackets: true,
    returns: "boolean",
    fields: [
        {
            name: "input",
            description: "input to check in",
            type: "string"
        }
    ],
    execute: async (d = data) => {
        const input = await d.resolveAll()

        if (input === undefined) return undefined

        return d.deflate([
            "yes",
            "no",
            "on",
            "off",
            "enable",
            "disable",
            "true",
            "false"
        ].some(e => e === input))
    }
})