module.exports = {
    name: "$author",
    brackets: true,
    description: "sets an embed author",
    fields: [{
        name: "embed index",
        description: "the index of the embed to add this author to, if no embed exists for that index, it'll be created.",
        type: "number"
    }, {
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
            index, 
            text,
            icon,
            hover 
        ] = (await d.resolveArray()) || []
        
        if (text === undefined) return undefined
        
        d.container.getEmbed(index).setAuthor(text, icon, hover)
        
        return d.deflate() 
    }
}