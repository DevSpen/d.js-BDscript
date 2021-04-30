module.exports = {
    name: "$toUppercase",
    brackets: true,
    description: "turns lowercase letters into uppercase",
    fields: [{
        name: "text",
        type: "string",
        description: "the text to convert"
    }],
    returns: "string",
    execute: async d => {
        if (d.value.fields.length) {
            const text = await d.resolveAll()
            
            if (typeof text === "undefined") return undefined
            
            return d.deflate(d.value.id, text.toUpperCase())
        } else {
            return d.deflate(d.value.id, d.value.inside.toUpperCase())
        }
    } 
}