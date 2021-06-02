module.exports = {
    name: "$removeNumbers",
    brackets: true,
    description: "Removes all numbers provided text.",
    fields: [{
        name: "text",
        type: "string",
        description: "The text to remove numbers from."
    }],
    returns: "string", 
    execute: async d => {
        const code = await d.resolveAll()

        if (code === undefined) return undefined

        return d.deflate(code.replace(/[0-9]/g, ''))
    }
}
