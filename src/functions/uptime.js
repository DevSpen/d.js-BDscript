module.exports = {
    name: "$uptime",
    examples: [`$parseTime[$uptime]`],
    description: "returns current client uptime in milliseconds",
    returns: "number",
    execute: async d => {
        return d.deflate(d.client.uptime ?? 0)
    }
}