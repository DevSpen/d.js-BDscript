module.exports = {
    name: "$serverNSFWLevel",
    description: "Returns the NSFW level of a server. Responses are DEFAULT, EXPLICIT, SAFE, AGE_RESTRICTED.",
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

            return d.deflate(guild.nsfwLevel)
        } else {
            return d.deflate(d.message?.guild?.nsfwLevel ?? 0)
        }
    }
}
