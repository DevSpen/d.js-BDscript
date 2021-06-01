module.exports = {
    name: "$title",
    brackets: true,
    description: "sets an embed title",
    fields: [{
        name: "text",
        type: "string",
        description: "the text for this title"
    }, {
        name: "url",
        type: "string",
        description: "the url for this title"
    }],
    execute: async d => {
        const [text, url] = (await d.resolveArray()) || []
        
        if (text === undefined) return undefined
        
        d.container.embed.setTitle(text)
        
        if (url) d.container.embed.setURL(url) 
        
        return d.deflate(d.value.id, "")
    }
}
