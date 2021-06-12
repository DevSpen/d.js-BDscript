module.exports = {
    name: "$thumbnail",
    brackets: true,
    description: "sets an embed thumbnail",
    fields: [{
        name: "embed index",
        description: "the index of the embed to add this thumbnail to, if no embed exists for that index, it'll be created.",
        type: "number"
    }, {
        name: "url",
        type: "string",
        description: "the url for the thumbnail"
    }],
    execute: async d => {
        const [
            index, url
        ] = await d.resolveArray() ?? []
        
        if (index === undefined) return undefined
        
        d.container.getEmbed(index).setThumbnail(url) 
        
        return d.deflate() 
    }
}