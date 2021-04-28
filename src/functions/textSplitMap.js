module.exports = {
    name: "$textSplitMap",
    brackets: true,
    execute: async d => {
        let [separator, ...code] = d.value.splits
       
        code = code.join(";")
        
        separator = await d.resolveCode(separator)
        
        if (separator === undefined) return undefined
        
        const content = []
        
        for (const field of d.container.splits) {
            d.container.pointTo = "splitText"
            d.container.splitText = { value: field } 
            
            const c = await d.resolveCode(code)
            
            if (c === undefined) return undefined
            
            content.push(c)
        }
        
        return d.deflate(content.join(separator))
    }
}