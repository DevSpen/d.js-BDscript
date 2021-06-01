module.exports = {
    name: "$textSplitPop",
    brackets: true,
    optional: true,
    description: "removes the last element of $textSplit and optionally returns it",
    fields: [{
        name: "returnElement",
        type: "boolean",
        description: "whether to return the removed element" 
    }], 
    returns: "?string",
    execute: async d => {
        if (d.value.inside) {
            const value = await d.resolveAll()
            
            if (value === undefined) return undefined
            
            return d.deflate(value === "yes" ? d.container.splits.pop() : "")
        } else {
            d.container.splits.pop() 
            
            return d.deflate()
        }
    }
}