module.exports = {
    name: "$textSplitIncludes",
    description: "checks whether an element of $textSplit is equal to given text",
    returns: "boolean",
    fields: [{
        name: "text",
        description: "the text to check for",
        type: "string"
    }],
    brackets: true,
    execute: async d => {
        const data = await d.resolveAll()
        
        if (data === undefined) return undefined
        
        return d.deflate(d.container.splits.includes(data))
    }
}