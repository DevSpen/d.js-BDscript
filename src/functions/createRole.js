const DiscordUtil = require("../utils/discord.js")

module.exports = {
    name: "$createRole",
    description: "creates a role in the specified guild",
    returns: "?string",
    fields: [{
        name: "guildID",
        type: "string",
        description: "the guild to create the role in"
    }, {
        name: "reason",
        type: "string",
        description: "reason for creating this role, can be left empty."
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
        name: "returnRoleID",
        type: "boolean",
        description: "whether to return the newly created role ID"
    }, {
        name: "permissions",
        type: "string",
        description: "the permission or permissions for this role, separated by `;`"
    }],
    brackets: true,
    execute: async d => {
        const [
            guildID,
            reason,
            name,
            color,
            hoisted,
            mentionable,
            position,
            returnRole = "no",
            ...perms
        ] = (await d.resolveArray()) ?? []
        
        if (guildID === undefined) return undefined
        
        const guild = d.client.guilds.cache.get(guildID)
        
        if (!guild) return d.sendError("guildID", guildID)
        
        const permissions = DiscordUtil.getPerms(perms, true)
        
        if (permissions.includes(undefined)) return d.sendError(`:x: Invalid permission in \`$createRole\``)
        
        const role = await guild.roles.create({
            reason,
            data: {
                name,
                color,
                position: Number(position) ?? 1,
                hoist: hoisted === "yes",
                mentionable: mentionable === "yes",
                permissions
            }
        }).catch(err => null)
        
        if (!role) return d.sendError(`:x: Failed to create role!`)
        
        return d.deflate(returnRole === "yes" ? role.id : "")
    }
}