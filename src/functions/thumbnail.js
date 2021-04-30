module.exports = {
    name: "$thumbnail",
    brackets: true,
    description: "sets an embed thumbnail",
    fields: [{
        name: "url",
        type: "string",
        description: "the url for the thumbnail"
    }],
    execute: async d => {
        const url = await d.resolveAll()
        
        if (url === undefined) return undefined
        
        d.container.embed.setThumbnail(url) 
        
        return d.deflate() 
    }
}