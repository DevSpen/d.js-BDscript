module.exports = {
    name: "$commandCount",
    description: "returns total command count or specific type command count",
    brackets: true,
    optional: true,
    fields: [{
        name: "types",
        description: "command type or types to count, separated by `;`",
        type: "string"
    }],
    returns: "number",
    execute: async d => {
        if (d.value.inside) {
            const types = await d.resolveArray()
            
            if (types === undefined) return undefined
            
            return d.deflate(d.client.bot.commands.filter((_, key) => types.includes(key)).reduce((x, type) => x + type.size, 0))
        }
        
        return d.deflate(d.client.bot.commands.reduce((x, type) => x + type.size, 0))
    }
}