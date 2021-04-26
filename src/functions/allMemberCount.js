module.exports = {
    name: "$allMemberCount",
    execute: async d => {
        return d.deflate(d.client.guilds.cache.reduce((x, y) => x + (y.memberCount || 0), 0))
    }
}