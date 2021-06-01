module.exports = {
    name: "$footer",
    brackets: true,
    description: "sets an embed footer",
    fields: [{
        name: "text",
        type: "string",
        description: "the text for the footer"
    }, {
        name: "icon",
        type: "string",
        description: "the url for the footer icon"
    }],
    execute: async d => {
        const [text, url] = (await d.resolveArray()) || []
        
        if (text === undefined) return undefined 
        
        d.container.embed.setFooter(text, url)
        
        return d.deflate(d.value.id, "")
    }
}