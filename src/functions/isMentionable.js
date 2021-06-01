module.exports = {
    name: "$isMentionable",
    description: "Checks whether a role is mentionable",
    returns: "boolean",
    brackets: true,
    fields: [
        {
            name: "guildID",
            type: "string",
            description: "the guild to get the role from"
        },
        {
            name: "roleID",
            type: "string",
            description: "the role to check for"
        }
    ],
    execute: async d => {
        const [
            guildID,
            roleID 
        ] = (await d.resolveArray()) ?? []

        const guild = d.client.guilds.cache.get(guildID)

        if (guildID === undefined) return undefined

        if (!guild) return d.sendError("guild ID", guildID)

        const role = guild.roles.cache.get(roleID)

        if (!role) return d.sendError("role ID", roleID)

        return d.deflate(role.mentionable)
    }
}