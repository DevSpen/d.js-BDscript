module.exports = {
    name: "$argCount",
    description: "returns argument count",
    returns: "number",
    fields: [{
        name: "text",
        description: "text to get arg count from",
        type: "string"
    }],
    brackets: true,
    optional: true,
    execute: async d => {
        if (d.value.inside) {
            const text = await d.resolveAll()
            
            if (text === undefined) return undefined
            
            return d.deflate(text.trim().split(/ +/g).length)
        }
        return d.deflate(d.args?.length ?? 0)
    }
}