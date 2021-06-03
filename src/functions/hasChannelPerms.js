const { READONLY_FLAGS } = require("../utils/discord")

module.exports = {
    name: "$hasChannelPerms",
    description: "checks whether given user has provided perms in a channel.",
    brackets: true,
    fields: [
        {
            name: "channelID",
            type: "string",
            description: "the channel to check perms in"
        },
        {
            name: "userID",
            type: "string",
            description: "the user to check perms for"
        },
        {
            name: "permissions",
            type: "string",
            description: "perm or perms to check for, separated by `;`"
        }
    ],
    returns: "boolean", 
    execute: async d => {
        const [
            channelID,
            userID,
            ...ps
        ] = (await d.resolveArray()) ?? []

        if (channelID === undefined) return undefined

        const channel = d.client.channels.cache.get(channelID)

        if (!channel) return d.sendError(`channel ID`, channelID)

        if (userID === undefined) return undefined

        const user = await d.client.users.fetch(userID).catch(() => null)

        if (!user) return d.sendError(`user ID`, userID)

        const perms = channel.permissionsFor(user.id)

        const readonly = READONLY_FLAGS()

        const pms = ps.map(p => readonly[p])

        if (pms.includes(undefined)) return d.sendError(`:x: Invalid permission in \`$hasChannelPerms\``)

        return d.deflate(perms ? pms.every(p => perms.has(p)) : false)
    }
}