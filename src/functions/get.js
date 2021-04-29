module.exports = {
    name: "$get",
    brackets: true,
    execute: async d => {
        const variable = await d.resolveAll()
        
        if (variable === undefined) return 
        
        return d.deflate(d.container.keywords[variable])
    }
}