module.exports = {
    name: "$serverBoostCount",
    description: "return server boost count",
    brackets: true,
    optional: true,
    fields: [
        {
            name: "guildID",
            description: "the guild to get boosts from",
            type: "string"
        }
    ],
    returns: "number",
    execute: async d => {
        if (d.value.inside) {
            const guildID = await d.resolveAll()

            if (guildID === undefined) return undefined
        
            const guild = d.client.guilds.cache.get(guildID)
            
            if (!guild) return d.sendError("guildID", guildID)

            return d.deflate(guild.premiumSubscriptionCount)
        } else {
            return d.deflate(d.message?.guild?.premiumSubscriptionCount ?? 0)
        }
    }
}