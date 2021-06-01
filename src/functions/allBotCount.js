module.exports = {
    name: "$allBotCount",
    description: "returns amount of cached bots your bot can see.",
    returns: "number",
    execute: async d => {
        return d.deflate(d.client.users.cache.filter(d => d.bot).size)
    }
}