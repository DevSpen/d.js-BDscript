module.exports = {
    name: "$decode",
    brackets: true,
    description: "Decodes a URL (URI). Check documentation for more info.",
    fields: [{
        name: "URL",
        type: "string",
        description: "The URL to decode."
    }],
    returns: "string", 
    execute: async d => {
        const code = await d.resolveAll()

        if (code === undefined) return undefined

        return d.deflate(code.decodeURI())
    }
}
