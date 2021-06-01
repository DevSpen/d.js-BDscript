module.exports = {
    name: "$color",
    brackets: true,
    description: "set an embed color",
    fields: [{
        name: "int|hex",
        description: "the int or hex for the color",
        type: "number|string"
    }],
    execute: async d => {
        const color = await d.resolveAll() 
        
        if (color === undefined) return undefined
        
        d.container.embed.setColor(color) 
        
        return d.deflate(d.value.id, "")
    }
}