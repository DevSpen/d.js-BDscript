module.exports = {
    name: "$footer",
    brackets: true,
    execute: async d => {
        const [text, url] = (await d.resolveArray()) || []
        
        if (text === undefined) return undefined 
        
        d.container.embed.setFooter(text, url)
        
        return d.deflate(d.value.id, "")
    }
}