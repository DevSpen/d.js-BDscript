const regexes = require("../utils/regexes")

module.exports = {
    name: "$roleExists",
    brackets: true,
    execute: async d => {
        const [
            guildID, 
            roleID
        ] = (await d.resolveArray()) || []
        
        if (guildID === undefined) return undefined
        
        const guild = d.client.guilds.cache.get(guildID)
        
        if (!guild) return d.sendError("guildID", guildID)
        
        return d.deflate(guild.roles.cache.has(roleID))
    }
}