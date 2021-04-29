module.exports = {
    name: "$replaceText",
    brackets: true,
    execute: async d => {
        const [
            text,
            match,
            to
        ] = (await d.resolveArray()) || []
        
        if (text === undefined) return undefined
        
        return d.deflate(text.split(match).join(to))
    }
}