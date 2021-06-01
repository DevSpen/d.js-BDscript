module.exports = {
    name: "$serverCount",
    description: "returns amount of servers your bot is in",
    returns: "number",
    execute: async d => {
        return d.deflate(d.client.guilds.cache.size)
    }
}