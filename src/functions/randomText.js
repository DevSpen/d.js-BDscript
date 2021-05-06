module.exports = {
    name: "$randomText",
    returns: "?any",
    fields: [{
        name: "texts",
        description: "the text to choose from, separated by `;`",
        type: "any"
    }],
    description: "returns random text",
    brackets: true,
    execute: async d => {
        let texts = (await d.resolveArray()) || []
        
        if (texts === undefined) return undefined
        
        const path = texts.join(";")
        
        const val = d.container.randomTexts[path] || texts[Math.floor(Math.random() * texts.length)]
        
        d.container.randomTexts[path] = val 
        
        return d.deflate(val)
    }
}