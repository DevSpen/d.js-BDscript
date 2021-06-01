module.exports = {
    name: "$removeSplitTextElement",
    description: "removes given element index from $textSplit",
    fields: [{
        name: "indexes",
        description: "the index or indexes to remove",
        type: "number"
    }],
    brackets: true,
    execute: async d => {
        const n = (await d.resolveArray()) || []
        
        if (n === undefined) return undefined
        
        d.container.splits = d.container.splits.filter((_, index) => !n.some(p => index === Number(n) - 1))
        
        return d.deflate() 
    }
}