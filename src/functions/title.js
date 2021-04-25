module.exports = {
    name: "$title",
    brackets: true,
    execute: async d => {
        if (d.value.fields.length) {
            const text = await d.resolveAll()
            
            if (!text) return undefined
            
            d.container.embed.setTitle(text)
        } else {
            d.container.embed.setTitle(d.value.inside) 
        }
        
        return d.deflate(d.value.id, "")
    }
}
