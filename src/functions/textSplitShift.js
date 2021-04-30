module.exports = {
    name: "$textSplitShift",
    brackets: true,
    description: "removes the first element of $textSplit and optionally returns it",
    fields: [{
        name: "returnElement",
        type: "boolean",
        description: "whether to return the removed element" 
    }], 
    returns: "?string",
    optional: true,
    execute: async d => {
        if (d.value.inside) {
            const value = await d.resolveAll()
            
            if (value === undefined) return undefined
            
            return d.deflate(value === "yes" ? d.container.splits.shift() : "")
        } else {
            d.container.splits.shift() 
            
            return d.deflate()
        }
    }
}