module.exports = {
    name: "$isServerAvailable",
    description: "Whether the server is available to access. If it is not available, it indicates a server outage.",
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

            return d.deflate(guild.available)
        } else {
            return d.deflate(d.message?.guild?.available ?? false)
        }
    }
}
