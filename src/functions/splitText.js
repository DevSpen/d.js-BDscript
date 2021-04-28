module.exports = {
    name: "$splitText",
    brackets: true,
    execute: async d => {
        const n = await d.resolveAll()
        
        if (n === undefined) return 
        
        return d.deflate(d.container.splits[Number(n) - 1] ?? "")
    }
}