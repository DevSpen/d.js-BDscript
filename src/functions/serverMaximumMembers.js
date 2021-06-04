module.exports = {
    name: "$serverMaximumMembers",
    description: "This function returns the limit of members a server has. Will return 100000, unless the server has above 100,000 members.",
    brackets: true,
    optional: true,
    fields: [
        {
            name: "guildID",
            description: "The server to return the data for.",
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

            return d.deflate(guild.maximumMembers)
        } else {
            return d.deflate(d.message?.guild?.maximumMembers ?? 0)
        }
    }
}
