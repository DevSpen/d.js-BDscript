module.exports = {
    name: "$removeNewLines",
    brackets: true,
    description: "Removes new lines from the provided text.",
    fields: [{
        name: "text",
        type: "string",
        description: "The text to remove new lines from."
    }],
    returns: "string", 
    execute: async d => {
        const code = await d.resolveAll()
    
        if (code === undefined) return undefined
    
        return d.deflate(code.replace(/(\r\n|\n|\r)/gm, ''))
    }
}
