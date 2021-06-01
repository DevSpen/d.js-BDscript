module.exports = {
    name: "$log",
    description: "prints something in console",
    fields: [{
        name: "text",
        description: "messsge to log",
        type: "any"
    }],
    brackets: true,
    execute: async d => {
        const text = await d.resolveAll()
        
        if (text === undefined) return undefined
        
        console.log(text) 
        
        return d.deflate()
    }
}