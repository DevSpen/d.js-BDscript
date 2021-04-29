module.exports = {
    name: "$textSplitPop",
    brackets: true,
    optional: true,
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