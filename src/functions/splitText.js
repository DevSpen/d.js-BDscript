module.exports = {
    name: "$splitText",
    brackets: true,
    description: "get a element from $textSplit",
    fields: [{
        name: "index",
        description: "the index of the element",
        type: "number"
    }],
    returns: "?any", 
    execute: async d => {
        const n = await d.resolveAll()
        
        if (n === undefined) return 
        
        return d.deflate(d.container.splits[Number(n) - 1] ?? "")
    }
}