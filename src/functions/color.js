module.exports = {
    name: "$color",
    brackets: true,
    description: "set an embed color",
    fields: [{
        name: "embed index",
        description: "the index of the embed to add this color to, if no embed exists for that index, it'll be created.",
        type: "number"
    }, {
        name: "int|hex",
        description: "the int or hex for the color",
        type: "number|string"
    }],
    execute: async d => {
        const [
            index, color 
        ] = await d.resolveArray() ?? [] 
        
        if (index === undefined) return undefined
        
        d.container.getEmbed(index).setColor(color) 
        
        return d.deflate(d.value.id, "")
    }
}