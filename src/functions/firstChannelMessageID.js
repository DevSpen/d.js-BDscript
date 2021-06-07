const { SnowflakeUtil } = require("discord.js")

module.exports = {
    name: "$firstChannelMessageID",
    description: "returns the first message ID that was sent in a channel",
    brackets: true,
    optional: true,
    fields: [
        {
            name: "channelID",
            description: "the channel to get the first message of",
            type: "string"
        }
    ],
    returns: "string",
    execute: async d => {
        const epoch = SnowflakeUtil.EPOCH

        if (!d.value.inside) {
            const m = await d.message?.channel?.messages?.fetch({
                limit: 1,
                after: epoch
            }).catch(() => null)

            if (!m || !m.size) return d.sendError(`:x: Failed to fetch first message!`)

            return d.deflate(m.first().id)
        }

        const channelID = await d.resolveAll()

        if (channelID === undefined) return undefined

        const channel = d.client.channels.cache.get(channelID)

        if (!channel) return d.sendError(`channel ID`, channelID)

        const m = await channel.messages?.fetch({
            limit: 1,
            after: epoch
        }).catch(() => null)

        if (!m || !m.size) return d.sendError(`:x: Failed to fetch first message!`)

        return d.deflate(m.first().id)
    }
}