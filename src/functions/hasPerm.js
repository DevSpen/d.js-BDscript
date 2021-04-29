const DiscordUtil = require("../utils/discord")

module.exports = {
    name: "$hasPerm",
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