module.exports = {
    name: "$message",
    brackets: true,
    description: "returns user arguments",
    fields: [{
        name: "arg number",
        type: "number",
        description: "the argument to return"
    }],
    returns: "?string",
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