module.exports = {
    name: "$toLowercase",
    brackets: true,
    execute: async d => {
        if (d.value.fields.length) {
            const text = await d.resolveAll()
            
            if (typeof text === "undefined") return undefined
            
            return d.deflate(d.value.id, text.toLowerCase())
        } else {
            return d.deflate(d.value.id, d.value.inside.toLowerCase())
        }
    } 