module.exports = {
    name: "$isBanned",
    description: "checks whether an user is banned from a guild", 
    brackets: true,
    fields: [{
        name: "guildID",
        type: "string",
        description: "the guild to check for"
    }, {
        name: "userID",
        type: "string",
        description: "the user to check"
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
        
        const ban = await guild.bans.fetch(userID || "1").catch(err => null)
        
        return d.deflate(Boolean(ban))
    }
}