module.exports = {
    name: "$addTimestamp",
    brackets: true,
    description: "sets a timestamp for the embed",
    optional: true,
    fields: [{
        name: "ms",
        description: "the date in milliseconds for this stamp",
        type: "number"
    }], 
    execute: async d => {
        if (!d.value.inside) { 
            d.container.embed.setTimestamp()
            return d.deflate()
        }
        const data = await d.resolveAll()
        
        if (data === undefined) return undefined
        
        d.container.embed.setTimestamp(Number(data) ?? Date.now()) 
        
        return d.deflate(d.value.id, "")
    }
} 