const data = require("../main/data");
const Function = require("../structures/Function");

module.exports = new Function({
    name: "$suppressErrors",
    description: "Suppresses errors after this function",
    brackets: true,
    optional: true,
    fields: [
        {
            name: "error message",
            description: "content to throw when an error is thrown.",
            type: "string",
        }
    ],
    execute: async (d = data) => {
        if (d.value.inside) {
            const txt = await d.resolveAll()
            if (txt === undefined) return undefined
            d.container.suppressErrors = {
                text: txt,
                embed: d.container.embed
            }
            return d.deflate()
        } else {
            d.container.suppressErrors = true 
            return d.deflate()
        }
    }
})