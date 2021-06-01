module.exports = {
    name: "$indexOfChar",
    description: "returns the index of given character in a string, or -1 if it does not contain that character",
    returns: "number",
    fields: [{
        name: "message",
        description: "text to test against",
        type: "string"
    }, {
        name: "text",
        description: "text to get index of",
        type: "string"
    }],
    brackets: true,
    execute: async d => {
        const [text, word] = (await d.resolveArray()) ?? []
        
        if (text === undefined) return undefined
        
        return d.deflate(text.indexOf(word))
    }
}