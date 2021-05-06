const regexes = require("../utils/regexes")

module.exports = {
    name: "$isBoosting",
    optional: true,
    brackets: true,
    description: "check whether or not a user is boosting given guild",
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
        if (!d.value.inside) {
            return d.deflate(Boolean(d.message?.member?.premiumSinceTimestamp))
        }
        
        const [
            guildID, 
            userID
        ] = (await d.resolveArray()) || []
        
        if (guildID === undefined) return undefined
        
        const guild = d.client.guilds.cache.get(guildID)
        
        if (!guild) return d.sendError("guildID", guildID)
        
        if (!regexes.USER_ID.test(userID)) return d.sendError(`userID`, userID)
        
        const member = await guild.members.fetch(userID).catch(err => null)
        
        if (!member) return d.sendError(`userID`, userID)
        
        return d.deflate(Boolean(member.premiumSinceTimestamp))
    }
}