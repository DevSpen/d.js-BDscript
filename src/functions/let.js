module.exports = {
    name: "$let",
    brackets: true,
    execute: async d => {
        const [
            variable,
            value
        ] = (await d.resolveArray()) || []
        
        if (variable === undefined) return undefined
        
        d.container.keywords[variable] = value 
        
        return d.deflate()
    }
}