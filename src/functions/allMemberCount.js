module.exports = {
    name: "$allMemberCount",
    description: "returns the amount of users your bot can see",
    returns: "number", 
    execute: async d => {
        return d.deflate(d.client.guilds.cache.reduce((x, y) => x + (y.memberCount || 0), 0))
    }
}