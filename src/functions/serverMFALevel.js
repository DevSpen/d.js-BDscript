module.exports = {
    name: "$serverMFALevel",
    description: "Returns a server’s MFA level.",
    brackets: true,
    optional: true,
    fields: [
        {
            name: "guildID",
            description: "The server to return the MFA level of.",
            type: "string"
        }
    ],
    returns: "string",
    execute: async d => {
        if (d.value.inside) {
            const guildID = await d.resolveAll()

            if (guildID === undefined) return undefined
        
            const guild = d.client.guilds.cache.get(guildID)
            
            if (!guild) return d.sendError("guildID", guildID)

            return d.deflate(guild.mfaLevel)
        } else {
            return d.deflate(d.message?.guild?.mfaLevel ?? 0)
        }
    }
}
