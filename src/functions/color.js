module.exports = {
    name: "$color",
    brackets: true,
    execute: async d => {
        const color = await d.resolveAll() 
        
        if (color === undefined) return undefined
        
        d.container.embed.setColor(color) 
        
        return d.deflate(d.value.id, "")
    }
}