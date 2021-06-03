module.exports = {
    name: "$serverBoostLevel",
    description: "return server boost level",
    brackets: true,
    optional: true,
    fields: [
        {
            name: "guildID",
            description: "the guild to get boost level from",
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

            return d.deflate(guild.premiumTier)
        } else {
            return d.deflate(d.message?.guild?.premiumTier ?? 0)
        }
    }
}