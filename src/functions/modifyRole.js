const data = require("../main/data");
const Function = require("../structures/Function");

module.exports = new Function({
    name: "$modifyRole",
    brackets: true,
    description: "modifies a role of a guild",
    fields: [
        {
            name: "guildID",
            description: "the guild the role is in",
            type: "string"
        },
        {
            name: "roleID",
            description: "the role to edit",
            type: "string"
        },
        {
            name: "reason",
            type: "string",
            description: "reason for ediitng this role, can be left empty."
        }, {
            name: "name",
            type: "string",
            description: "the name for the role"
        }, {
            name: "color",
            type: "string|number",
            description: "the color int or hex for the role"
        }, {
            name: "hoisted",
            type: "boolean",
            description: "whether or not this role should be hoisted"
        }, {
            name: "mentionable",
            type: "boolean",
            description: "whether or not this role should be mentionable"
        }, {
            name: "position",
            type: "number",
            description: "the position for the role"
        }, {
            name: "permissions",
            type: "string",
            description: "the permission or permissions for this role, separated by `;`"
        }
    ],
    execute: async (d = data) => {
        const [
            guildID,
            roleID, 
            reason,
            name,
            color,
            hoisted,
            mentionable,
            position,
            ...perms
        ] = (await d.resolveArray()) ?? []
        
        if (guildID === undefined) return undefined
        
        const guild = d.client.guilds.cache.get(guildID)
        
        if (!guild) return d.sendError("guildID", guildID)
        
        const role = guild.roles.cache.get(roleID)

        if (!role) return d.sendError(`role ID`, roleID)

        const permissions = perms.length ? DiscordUtil.getPerms(perms, true) : []
        
        if (permissions.includes(undefined)) return d.sendError(`:x: Invalid permission in \`$modifyRole\``)

        const edit = role.edit({
            permissions: permissions.length ? permissions : role.permissions,
            name: name || role.name,
            color: color ? color : role.color,
            hoist: hoisted ? hoisted === "yes" : role.hoist,
            position: position ? Number(position) : role.position,
            mentionable: mentionable ? mentionable === "yes" : role.mentionable
        }, reason || undefined).catch(() => null)

        if (!edit) return d.sendError(`:x: Failed to modify role!`)

        return d.deflate()
    }
})