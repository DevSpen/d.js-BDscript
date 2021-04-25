module.exports = {
    name: "$message",
    brackets: true,
    optional: true,
    execute: async d => {
        if (!d.value.inside) {
            return d.deflate(d.value.id, d.args ? d.args.join(" ") : "")
        } else {
            if (d.value.fields.length) {
                const n = await d.resolveAll()
                
                if (!n) return undefined 
                
                return d.deflate(d.value.id, d.args ? d.args[Number(n) - 1] || "" : "")
            } else {
                return d.deflate(d.value.id, d.args ? d.args[Number(d.value.inside) - 1] || "" : "")
            }
        }
    }
}