module.exports = {
    name: "$variableCount",
    description: "counts variables",
    returns: "number",
    execute: async d => {
        return d.deflate(d.client.bot.variables.length - 1)
    }
}