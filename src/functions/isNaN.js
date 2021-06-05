module.exports = {
    name: "$isNaN",
    brackets: true,
    description: "Returns whether the provided text is not a number (NaN).",
    fields: [{
        name: "text",
        type: "string",
        description: "The string to check."
    }],
    returns: "boolean", 
    execute: async d => {
        const code = await d.resolveAll()

        if (code === undefined) return undefined

        return d.deflate(isNaN(code)) 
    }
}
