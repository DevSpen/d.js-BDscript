module.exports = {
    name: "$joinSplitText",
    brackets: true,
    description: "joins $textSplit elements with given separator",
    returns: "?string",
    fields: [{
        name: "separator",
        type: "string",
        description: "the separator for each element"
    }],
    execute: async d => {
        const separator = await d.resolveAll()
        
        if (separator === undefined) return undefined
        
        return d.deflate(d.container.splits.join(separator))
    }
}