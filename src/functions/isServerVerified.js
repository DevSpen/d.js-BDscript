module.exports = {
    name: "$isServerVerified",
    description: "Returns whether a server is verified or not.",
    brackets: true,
    optional: true,
    fields: [
        {
            name: "guildID",
            description: "The server to return the data for.",
            type: "string"
        }
    ],
    returns: "boolean",
    execute: async d => {
        if (d.value.inside) {
            const guildID = await d.resolveAll()

            if (guildID === undefined) return undefined

            const guild = d.client.guilds.cache.get(guildID)

            if (!guild) return d.sendError("guildID", guildID)

            return d.deflate(guild.verified)
        } else {
            return d.deflate(d.message?.guild?.verified ?? 0)
        }
    }
}
