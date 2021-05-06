module.exports = {
    name: "$numberSeparator",
    description: "separates thousands in the number",
    fields: [{
        name: "number",
        description: "the number to separate",
        type: "number"
    }],
    returns: "?string",
    brackets: true,
    execute: async d => {
        const n = await d.resolveAll()
        
        if (n === undefined) return 
        
        return d.deflate(Number(n).toLocaleString?.() ?? "")
    }
}