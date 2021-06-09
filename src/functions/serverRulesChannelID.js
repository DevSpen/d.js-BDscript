module.exports = {
    name: "$serverRulesChannelID",
    description: "Returns a server’s rules channel ID (which is set in community settings).",
    brackets: true,
    optional: true,
    fields: [
        {
            name: "guildID",
            description: "The server to return the data for.",
            type: "string"
        }
    ],
    returns: "?string",
    execute: async d => {
        if (d.value.inside) {
            const guildID = await d.resolveAll()

            if (guildID === undefined) return undefined
        
            const guild = d.client.guilds.cache.get(guildID)
            
            if (!guild) return d.sendError("guildID", guildID)

            return d.deflate(guild.rulesChannelID)
        } else {
            return d.deflate(d.message?.guild?.rulesChannelID ?? "")
        }
    }
}
