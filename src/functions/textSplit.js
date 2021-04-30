module.exports = {
    name: "$textSplit",
    brackets: true,
    description: "splits given text by a splitter",
    fields: [{
        name: "text",
        type: "string",
        description: "the text to split"
    }, {
        name: "splitter",
        type: "string",
        description: "the character to split text by"
    }],
    execute: async d => {
        const [
            text,
            separator = ""
        ] = (await d.resolveArray()) || []
        
        if (text === undefined) return undefined
        
        d.container.splits = text.split(separator)
        
        return d.deflate() 
    }
}