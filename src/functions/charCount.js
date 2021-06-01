module.exports = {
    name: "$charCount",
    description: "returns character count for given text or user arguments",
    returns: "number",
    fields: [{
        name: "text",
        description: "the text to get count from",
        type: "string"
    }],
    brackets: true,
    optional: true,
    execute: async d => {
        if (!d.value.inside) return d.deflate(d.args?.join(" ").length ?? 0)
        else {
            const n = await d.resolveAll()
            
            if (n === undefined) return 
            
            return d.deflate(n.length ?? 0)
        }
    }
}