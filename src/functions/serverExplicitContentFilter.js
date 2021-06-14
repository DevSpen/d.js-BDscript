module.exports = {
    name: "$serverExplicitContentFilter",
    description: "The explicit content filter level of the server. Returns DISABLED, MEMBERS_WITHOUT_ROLES, or ALL_MEMBERS.",
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

            return d.deflate(guild.explicitContentFilter.toTitle())
        } else {
            return d.deflate(d.message?.guild?.explicitContentFilter.toTitle() ?? "")
        }
    }
}
