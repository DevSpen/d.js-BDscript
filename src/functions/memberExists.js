const regexes = require("../utils/regexes")

module.exports = {
    name: "$memberExists",
    brackets: true,
    execute: async d => {
        const [
            guildID, 
            userID
        ] = (await d.resolveArray()) || []
        
        if (guildID === undefined) return undefined
        
        const guild = d.client.guilds.cache.get(guildID)
        
        if (!guild) return d.sendError("guildID", guildID)
        
        if (!regexes.USER_ID.test(userID)) return d.deflate(false) 
        
        const member = await guild.members.fetch(userID).catch(err => null)
        
        return d.deflate(Boolean(member))
    }
}