module.exports = {
    name: "$serverVanityCode",
    description: "Returns a server's vanity URL code.",
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

            return d.deflate(guild.vanityURLCode)
        } else {
            return d.deflate(d.message?.guild?.vanityURLCode ?? "")
        }
    }
}
