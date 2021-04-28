module.exports = {
    name: "$data",
    brackets: true,
    execute: async d => {
        const prop = await d.resolveAll()
        
        if (prop === undefined) return 
        
        const val = eval(`d.container.${d.container.pointTo || "data"}?.${prop}`) 
        
        if (val === undefined) return d.sendError(`:x: No data '${prop}' found!`)
        
        return d.deflate(val) 
    }
}