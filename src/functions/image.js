module.exports = {
    name: "$image",
    brackets: true,
    description: "sets an embed image",
    fields: [{
        name: "embed index",
        description: "the index of the embed to add this image to, if no embed exists for that index, it'll be created.",
        type: "number"
    }, {
        name: "url",
        type: "string",
        description: "the url for the image"
    }],
    execute: async d => {
        const [
            index, url 
        ] = await d.resolveArray() ?? []
        
        if (index === undefined) return undefined
        
        d.container.getEmbed(index).setImage(url)
        
        return d.deflate() 
    }
}