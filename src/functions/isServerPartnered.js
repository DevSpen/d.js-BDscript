module.exports = {
    name: "$isServerPartnered",
    description: "Returns whether a server is partnered or not.",
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

            return d.deflate(guild.partnered)
        } else {
            return d.deflate(d.message?.guild?.partnered ?? 0)
        }
    }
}
