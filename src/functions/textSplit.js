module.exports = {
    name: "$textSplit",
    brackets: true,
    execute: async d => {
        const [
            text,
            separator = ""
        ] = (await d.resolveArray()) || []
        
        if (text === undefined) return undefined
        
        d.container.splits = text.split(separator)
        
        return d.deflate() 
    }
}