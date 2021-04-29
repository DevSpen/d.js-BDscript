module.exports = {
    name: "$textSplitShift",
    brackets: true,
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