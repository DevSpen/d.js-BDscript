module.exports = {
    name: "$serverAFKChannel",
    description: "Returns a server’s AFK voice channel ID (which is set in server-settings).",
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

            return d.deflate(guild.afkChannelID)
        } else {
            return d.deflate(d.message?.guild?.afkChannelID ?? "")
        }
    }
}
