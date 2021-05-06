module.exports = {
    name: "$textSplitMap",
    brackets: true,
    returns: "?string", 
    description: "creates a loop over every element of $textSplit, $data contains `value` which will be the value of each element",
    fields: [{
        name: "separator",
        type: "string",
        description: "the separator for each loop output, use `skip` to get no output."
    }, {
        name: "code",
        type: "string",
        description: "the code to execute for each element"
    }],
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
            
            if (c && separator !== "skip") content.push(c)
        }
        
        return d.deflate(separator === "skip" ? "" : content.join(separator))
    }
}