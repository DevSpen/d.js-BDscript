module.exports = {
    name: "$botCount",
    description: "returns current bot count for a guild",
    optional: true,
    brackets: true,
    fields: [{
        name: "guildID",
        description: "the guild to return bot count from",
        type: "string"
    }],
    returns: "number",
    execute: async d => {
        if (d.value.inside) {
            const guildID = await d.resolveAll()

            if (guildID === undefined) return undefined

            const guild = d.client.guilds.cache.get(guildID)

            if (!guild) return d.sendError("guild ID", guildID)

            return d.deflate(guild.members.cache.filter(d => d.user.bot).size)
        } else {
            return d.deflate(d.message?.guild?.members.cache.filter(d => d.user.bot).size ?? 0)
        }
    }
}