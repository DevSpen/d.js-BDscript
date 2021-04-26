module.exports = {
    name: "$thumbnail",
    brackets: true,
    execute: async d => {
        const url = await d.resolveAll()
        
        if (url === undefined) return undefined
        
        d.container.embed.setThumbnail(url) 
        
        return d.deflate() 
    }
}