module.exports = {
    name: "$serverAFKTimeout",
    description: "Returns a server’s AFK timeout.",
    brackets: true,
    optional: true,
    fields: [
        {
            name: "guildID",
            description: "The server to return the data for.",
            type: "string"
        }
    ],
    returns: "?number",
    execute: async d => {
        if (d.value.inside) {
            const guildID = await d.resolveAll()

            if (guildID === undefined) return undefined
        
            const guild = d.client.guilds.cache.get(guildID)
            
            if (!guild) return d.sendError("guildID", guildID)

            return d.deflate(guild.afkTimeout)
        } else {
            return d.deflate(d.message?.guild?.afkTimeout ?? "")
        }
    }
}
