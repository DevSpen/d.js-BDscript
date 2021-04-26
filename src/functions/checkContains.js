module.exports ={
    name: "$checkContains",
    brackets: true,
    execute: async d => {
        const array = await d.resolveArray()
        
        if (!array) return undefined
        
        const [text, ...words] = array 
        
        return d.deflate(d.value.id, words.some(w => text.includes(w)))
    }
}