const regexes = require("../utils/regexes")

module.exports = {
    name: "$memberExists",
    brackets: true,
    description: "check whether or not given member ID exists in a guild",
    fields: [{
        name: "guildID",
        type: "string",
        description: "the guild to check for the member"
    }, {
        name: "userID",
        type: "string",
        description: "the member to check for"
    }],
    returns: "boolean",
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