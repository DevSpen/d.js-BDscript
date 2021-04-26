module.exports = {
    name: "$description",
    brackets: true,
    execute: async d => {
        const data = await d.resolveAll()
        
        if (data === undefined) return undefined
        
        d.container.embed.setDescription(data) 
        
        return d.deflate(d.value.id, "")
    }
} 