module.exports = {
    name: "$author",
    brackets: true,
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