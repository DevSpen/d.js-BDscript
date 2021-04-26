module.exports = {
    name: "$message",
    brackets: true,
    optional: true,
    execute: async d => {
        if (!d.value.inside) {
            return d.deflate(d.value.id, d.args ? d.args.join(" ") : "")
        } else {
            const n = await d.resolveAll()
            
            return d.deflate(d.args[Number(n) - 1] || "")
        }
    }
}