module.exports = {
    name: "$serverVanityUses",
    description: "Returns how many users joined the server via the vanity URL (if the server has one).",
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
            
            const vanity = await guild.fetchVanityData().catch(() => null)
           
            return d.deflate(vanity?.uses ?? "")
        } else {
            const vanity = await d.message?.guild?.fetchVanityData().catch(() => null)
           
            return d.deflate(vanity?.uses ?? "")
        }
    }
}
