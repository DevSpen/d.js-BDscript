module.exports = {
    name: "$allRoleCount",
    description: "Returns the total amount of roles from every server the bot is in.",
    returns: "number",
    execute: async d => {
        return d.deflate(d.client.guilds.cache.reduce((x, guild) => x + guild.roles.cache.size, 0))
    }
}
