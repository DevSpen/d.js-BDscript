module.exports = {
    name: "$reverseText",
    brackets: true,
    description: "Reverses the provide text.",
    fields: [{
        name: "text",
        type: "string",
        description: "The text to reverse."
    }],
    returns: "string", 
    execute: async d => {
        const code = await d.resolveAll()

        if (code === undefined) return undefined

        return d.deflate(code.split("").reverse().join(""))
    }
}
