module.exports = {
    name: "$findNumbers",
    brackets: true,
    description: "Returns all numbers found in the provided text.",
    fields: [{
        name: "text",
        type: "string",
        description: "The text to retrieve numbers from."
    }],
    returns: "string", 
    execute: async d => {
        const code = await d.resolveAll()

        if (code === undefined) return undefined

        return d.deflate(code.replace( /^\D+/g, ''))
    }
}
