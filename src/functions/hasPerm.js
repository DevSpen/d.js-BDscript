const DiscordUtil = require("../utils/discord")

module.exports = {
    name: "$hasPerm",
    returns: "boolean",
    fields: [{
        name: "guildID",
        type: "string",
        description: "the guild the user is in"
    }, {
        name: "userID",
        type: "string",
        description: "the user to check for permissions"
    }, {
        name: "permissions",
        type: "string",
        description: "the permission or permissions to check for separated by `;`"
    }],
    description: "checks whether a user has given permissions",
    brackets: true,
    execute: async d => {
        const [
            guildID,
            userID,
            ...permOrPerms
        ] = (await d.resolveArray()) || []
        
        if (guildID === undefined) return undefined
        
        const guild = d.client.guilds.cache.get(guildID)
            
        if (!guild) return d.sendError("guildID", guildID)
            
        const member = await guild.members.fetch(userID).catch(err => null)
          
        if (!member) return d.sendError("userID", userID)
        
        const perms = DiscordUtil.getPerms(permOrPerms)
        
        if (perms.includes(undefined)) return d.sendError(`:x: Invalid permission provided in \`$hasPerm\``) 
        
        return d.deflate(perms.every(bits => member.permissions.has(bits))) 
    }
}