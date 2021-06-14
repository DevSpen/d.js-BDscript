const Function = require("../structures/Function");

module.exports = new Function({
    name: "$delete",
    description: "deletes a local variable created with $let",
    brackets: true,
    fields: [
        {
            name: "variable",
            description: "the name of the variable to delete",
            type: "string"
        }
    ],
    execute: async d => {
        const variable = await d.resolveAll()

        if (variable === undefined) return undefined

        delete d.container.keywords[variable]

        return d.deflate()
    }
})