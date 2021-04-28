module.exports = {
    name: "$joinSplitText",
    brackets: true,
    execute: async d => {
        const separator = await d.resolveAll()
        
        if (separator === undefined) return undefined
        
        return d.deflate(d.container.splits.join(separator))
    }
}