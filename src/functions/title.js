module.exports = {
    name: "$title",
    brackets: true,
    description: "sets an embed title",
    fields: [{
        name: "embed index",
        description: "the index of the embed to add this title to, if no embed exists for that index, it'll be created.",
        type: "number"
    }, {
        name: "text",
        type: "string",
        description: "the text for this title"
    }, {
        name: "url",
        type: "string",
        description: "the url for this title"
    }],
    execute: async d => {
        const [index, text, url] = (await d.resolveArray()) || []
        
        if (index === undefined) return undefined
        
        d.container.getEmbed(index).setTitle(text)
        
        if (url) d.container.embed.setURL(url) 
        
        return d.deflate(d.value.id, "")
    }
}
