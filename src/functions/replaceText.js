module.exports = {
    name: "$replaceText",
    brackets: true,
    description: "replaces given string in text with something else",
    fields: [{
        name: "text",
        description: "text to replace from",
        type: "string"
    }, {
        name: "match",
        description: "the string to replace",
        type: "string"
    }, {
        name: "to",
        description: "the word to replace matches to",
        type: "string"
    }],
    returns: "?string",
    execute: async d => {
        const [
            text,
            match,
            to
        ] = (await d.resolveArray()) || []
        
        if (text === undefined) return undefined
        
        return d.deflate(text.split(match).join(to))
    }
}