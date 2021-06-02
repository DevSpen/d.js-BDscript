module.exports = {
    name: "$removeSpecialChars",
    brackets: true,
    description: "Removes special characters from text.",
    fields: [{
        name: "text",
        type: "string",
        description: "The text to remove special characters from."
    }],
    returns: "string", 
    execute: async d => {
        const code = await d.resolveAll()

        if (code === undefined) return undefined

        return d.deflate(code.replace(/[^a-zA-Z ]/g, ""))
    }
}
