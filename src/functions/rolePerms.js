const Function = require("../structures/Function");
const { getPerms, Permissions } = require("../utils/discord");

module.exports = new Function({
    name: "$rolePerms",
    brackets: true,
    fields: [
        {
            name: "guildID",
            description: "the guild to get the role from",
            type: "string"
        },
        {
            name: "roleID",
            description: "the role to list perms for",
            type: "string"
        },
        {
            name: "separator",
            description: "separator used for each permission.",
            type: "string"
        },
        {
            name: "sortByAlphabet",
            description: "whether to sort permissions by alphabet.",
            type: "boolean"
        }
    ],
    execute: async d => {
        const [
            guildID,
            roleID,
            separator = ", ",
            sort = "no"
        ] = (await d.resolveArray()) ?? []

        if (guildID === undefined) return undefined

        const guild = d.client.guilds.cache.get(guildID)

        if (!guild) return d.sendError("guild ID", guildID)

        const role = guild.roles.cache.get(roleID)

        if (!role) return d.sendError(`role ID`, roleID)

        const perms = Permissions(role.permissions.bitfield)

        return d.deflate(perms.readable.includes("Administrator") ? "Administrator" : sort === "yes" ? perms.readable.sort().join(separator) : perms.readable.join(separator))
    }
})