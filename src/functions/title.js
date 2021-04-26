module.exports = {
    name: "$title",
    brackets: true,
    execute: async d => {
        const [text, url] = (await d.resolveArray()) || []
        
        if (text === undefined) return undefined
        
        d.container.embed.setTitle(text, url)
        
        return d.deflate(d.value.id, "")
    }
}
