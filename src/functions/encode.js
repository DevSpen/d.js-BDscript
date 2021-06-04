module.exports = {
    name: "$encode",
    brackets: true,
    description: "Encodes a URL (URI). Check documentation for more info.",
    fields: [{
        name: "URL",
        type: "string",
        description: "The URL to encode."
    }],
    returns: "string", 
    execute: async d => {
        const code = await d.resolveAll()

        if (code === undefined) return undefined

        return d.deflate(code.encodeURI())
    }
}
