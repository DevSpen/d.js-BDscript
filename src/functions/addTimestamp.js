module.exports = {
    name: "$addTimestamp",
    brackets: true,
    description: "sets a timestamp for the embed",
    fields: [
        {
            name: "embed index",
            description: "the index of the embed to add this timestamp to, if no embed exists for that index, it'll be created.",
            type: "number"
        },
        {
            name: "ms",
            description: "the date in milliseconds for this stamp",
            type: "number"
    }], 
    execute: async d => {
        const [
            index, 
            data 
        ] = await d.resolveArray() ?? []
        
        if (index === undefined) return undefined
        
        d.container.getEmbed(index).setTimestamp(Number(data) || Date.now()) 
        
        return d.deflate(d.value.id, "")
    }
} 