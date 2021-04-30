module.exports = {
    name: "$image",
    brackets: true,
    description: "sets an embed image",
    fields: [{
        name: "url",
        type: "string",
        description: "the url for the image"
    }],
    execute: async d => {
        const url = await d.resolveAll()
        
        if (url === undefined) return undefined
        
        d.container.embed.setImage(url)
        
        return d.deflate() 
    }
}