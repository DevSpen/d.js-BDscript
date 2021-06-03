module.exports = {
    name: "$isBoolean",
    brackets: true,
    description: "Returns whether the provided text is a boolean. Booleans are yes, no, on, off, true, false. This is case sensitive.",
    fields: [{
        name: "text",
        type: "string",
        description: "The text to check."
    }],
    returns: "boolean", 
    execute: async d => {
        const code = await d.resolveAll()

        if (code === undefined) return undefined

        return d.deflate(code.includes(“yes”, “no”, “true”, “false”, “on”, “off”))
    }
}
