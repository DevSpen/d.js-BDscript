const data = require("../main/data");
const Function = require("../structures/Function");

module.exports = new Function({
    name: "$typeof",
    description: "check for a property of the global `d` object (it's type).",
    returns: "string",
    brackets: true,
    fields: [
        {
            name: "property",
            description: "the property to get type of",
            type: "string"
        }
    ],
    execute: async (d = data) => {
        const property = await d.resolveAll()

        if (property === undefined) return undefined

        try {
            var type = await eval(`typeof d.${property}`)
        } catch (error) {
            return d.sendError(`:x: Failed to get type!`)
        }

        return d.deflate(type ?? "undefined")
    }
})