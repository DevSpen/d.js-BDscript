module.exports = {
    name: "$getBanReason",
    description: "returns the reason an user was banned for",
    returns: "?string",
    brackets: true,
    fields: [
        {
            name: "guildID",
            type: "string",
            description: "the guild to get banned reason from"
        },
        {
            name: "userID",
            description: "the user to get its ban reason",
            type: "string"
        }
    ],
    execute: async d => {
        const [
            guildID,
            userID
        ] = (await d.resolveArray()) ?? []

        if (guildID === undefined) return undefined

        const guild = d.client.guilds.cache.get(guildID)

        if (!guild) return d.sendError(`guild ID`, guildID)

        const ban = await guild.bans.fetch(userID ?? "0").catch(() => null)

        if (!ban) return d.sendError(`:x: User is not banned`)

        return d.deflate(ban.reason ?? "")
    }
}