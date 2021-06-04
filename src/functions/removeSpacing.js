module.exports = {
    name: "$removeSpacing",
    brackets: true,
    description: "Removes excess spacing from text.",
    fields: [{
        name: "text",
        type: "string",
        description: "The text to remove excess spacing from."
    }],
    returns: "string", 
    execute: async d => {
        const code = await d.resolveAll()

        if (code === undefined) return undefined

        return d.deflate(code.trim())
    }
}
