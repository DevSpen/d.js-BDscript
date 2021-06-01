module.exports = {
    name: "$description",
    brackets: true,
    description: "sets an embed description",
    fields: [{
        name: "text",
        description: "the description text",
        type: "string"
    }], 
    execute: async d => {
        const data = await d.resolveAll()
        
        if (data === undefined) return undefined
        
        d.container.embed.setDescription(data) 
        
        return d.deflate(d.value.id, "")
    }
} 