module.exports = {
    name: "$getChannelSlowmode",
    description: "gets the slowmode of a channel in seconds",
    returns: "number",
    optional: true,
    brackets: true,
    fields: [
        {
            name: "channelID",
            type: "string",
            description: "the channel to get slowmode from"
        }
    ],
    execute: async d => {
        if (!d.value.inside) {
            return d.deflate(d.message?.channel?.rateLimitPerUser ?? 0)
        } else {
            const id = await d.resolveAll()

            if (id === undefined) return undefined

            const c = d.client.channels.cache.get(id)

            if (!c) return d.sendError("channel ID", id)

            return d.deflate(c.rateLimitPerUser ?? 0)
        }
    }
}