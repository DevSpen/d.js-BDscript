module.exports = {
    name: "$author",
    brackets: true,
    description: "sets an embed author",
    fields: [{
        name: "text",
        type: "string",
        description: "the text for the author"
    }, {
        name: "icon",
        type: "string",
        description: "the icon for the author"
    }, {
        name: "url",
        type: "string",
        description: "the url for this author"
    }],
    execute: async d => {
        const [
            text,
            icon,
            hover 
        ] = (await d.resolveArray()) || []
        
        if (text === undefined) return undefined
        
        d.container.embed.setAuthor(text, icon, hover)
        
        return d.deflate() 
    }
}