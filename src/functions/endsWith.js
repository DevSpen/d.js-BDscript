module.exports = {
    name: "$endsWith",
    description: "checks whether a string ends with another text",
    returns: "boolean",
    fields: [{
        name: "message",
        description: "text to test against",
        type: "string"
    }, {
        name: "text",
        description: "text to check",
        type: "string"
    }],
    brackets: true,
    execute: async d => {
        const [text, word] = (await d.resolveArray()) ?? []
        
        if (text === undefined) return undefined
        
        return d.deflate(text.endsWith(word))
    }
}