module.exports = {
    name: "$description",
    brackets: true,
    execute: async d => {
        if (d.value.fields.length) {
            const text = await d.resolveAll()
            
            if (typeof text === undefined) return undefined
            
            d.container.embed.setDescription(text)
        } else {
            d.container.embed.setDescription(d.value.inside) 
        }
        
        return d.deflate(d.value.id, "")
    }
} 