module.exports = {
    name: "$nickname",
    description: "Returns a user’s nickname.",
    returns: "?string",
    brackets: true,
    optional: true,
    fields: [{
        name: "guildID",
        description: "The server to get the nickname from.",
        type: "string"
    }, {
        name: "userID",
        description: "The user to get the nickname for.",
        type: "string"
    }],
    execute: async d => {
        if (!d.value.inside) {
            return d.deflate(d.message?.member?.displayName ?? "")
        }
        
        const [
            guildID,
            userID
        ] = (await d.resolveArray()) || []
        
        if (guildID === undefined) return 
        
        const guild = d.client.guilds.cache.get(guildID)
        
        if (!guild) return d.sendError("guildID", guildID)
        
        const member = await guild.members.fetch(userID || "1").catch(err => null)
        
        if (!member) return d.sendError("userID", userID)
        
        return d.deflate(member.displayName)
    }
}