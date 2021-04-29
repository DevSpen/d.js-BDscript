module.exports = {
    name: "$image",
    brackets: true,
    execute: async d => {
        const url = await d.resolveAll()
        
        if (url === undefined) return undefined
        
        d.container.embed.setImage(url)
        
        return d.deflate() 
    }
}