module.exports = {
    name: "$replaceTextWithRegex",
    brackets: true,
    description: "replaces given string in text with something else using regexes",
    fields: [{
        name: "text",
        description: "text to replace from",
        type: "string"
    }, {
        name: "regex",
        description: "the regex used to replace words",
        type: "string"
    }, {
        name: "flags",
        description: "the flags for the regex, `i` stands for insensitive, `g` for replacing all concurrences, etc...",
        type: "string"
    }, {
        name: "new text",
        description: "what to replace matching words to",
        type: "string"
    }],
    returns: "?string",
    execute: async d => {
        const [
            text,
            regex,
            flags,
            to
        ] = (await d.resolveArray()) || []
        
        if (text === undefined) return undefined
        
        const regexp = new RegExp(regex, flags || undefined)
        
        return d.deflate(text.replace(regexp, to))
    }
}