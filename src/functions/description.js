module.exports = {
    name: "$description",
    brackets: true,
    description: "sets an embed description",
    fields: [
        {
            name: "embed index",
            description: "the index of the embed to add this description to, if no embed exists for that index, it'll be created.",
            type: "number"
        },
        {
            name: "text",
            description: "the description text",
            type: "string"
    }], 
    execute: async d => {
        const [
            index, data 
        ] = await d.resolveArray() ?? []
        
        if (index === undefined) return undefined

        d.container.getEmbed(index).setDescription(data) 
        
        return d.deflate(d.value.id, "")
    }
} 