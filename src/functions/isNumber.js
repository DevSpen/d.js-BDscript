module.exports = {
    name: "$isNumber",
    description: "checks if given input is a valid number",
    fields: [{
        name: "number",
        description: "the number to check",
        type: "number"
    }],
    returns: "boolean",
    brackets: true,
    execute: async d => {
        const n = await d.resolveAll()
        
        if (n === undefined) return undefined 
        
        if (n === "") return d.deflate(false)
        
        if (Number(n) === 0) return d.deflate(true) 
        
        return d.deflate(Boolean(Number(n)))
    }
}