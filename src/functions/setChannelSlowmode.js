const ms = require("ms")

module.exports = {
    name: "$setChannelSlowmode",
    description: "sets a channel slowmode",
    brackets: true,
    fields: [
        {
            name: "channelID",
            description: "the channel to change the slowmode.",
            type: "string"
        },
        {
            name: "slowmode",
            type: "string", 
            description: "the slowmode to set to this channel, leave empty or skip field to remove slowmode."
        },
        {
            name: "reason",
            type: "string",
            description: "the reason for changing this channel slowmode"
        }
    ],
    execute: async d => {
        const [
            channelID, 
            slowmode = 0,
            reason 
        ] = (await d.resolveArray()) ?? []

        if (channelID === undefined) return undefined

        const channel = d.client.channels.cache.get(channelID)

        if (!channel) return d.sendError(`channel ID`, channelID)

        const s = await channel.setRateLimitPerUser(ms(slowmode || "0") / 1000 || 0, reason).catch(() => null)

        if (!s) return d.sendError(`:x: Failed to change channel slowmode!`)

        return d.deflate()
    }
}