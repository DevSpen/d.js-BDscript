module.exports ={
    name: "$checkContains",
    brackets: true,
    description: "checks whether given text contains one or more words",
    returns: "boolean",
    fields: [{
        name: "text",
        type: "string",
        description: "the text to check on"
    }, {
        name: "words",
        type: "string",
        description: "the word or words to check, separated by `;`"
    }],
    execute: async d => {
        const array = await d.resolveArray()
        
        if (!array) return undefined
        
        const [text, ...words] = array 
        
        return d.deflate(d.value.id, words.some(w => text.includes(w)))
    }
}