module.exports = {
    name: "$footer",
    brackets: true,
    description: "sets an embed footer",
    fields: [{
        name: "embed index",
        description: "the index of the embed to add this footer to, if no embed exists for that index, it'll be created.",
        type: "number"
    }, {
        name: "text",
        type: "string",
        description: "the text for the footer"
    }, {
        name: "icon",
        type: "string",
        description: "the url for the footer icon"
    }],
    execute: async d => {
        const [index, text, url] = (await d.resolveArray()) || []
        
        if (index === undefined) return undefined 
        
        d.container.getEmbed(index).setFooter(text, url)
        
        return d.deflate(d.value.id, "")
    }
}