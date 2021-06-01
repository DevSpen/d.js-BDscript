module.exports = {
    name: "$userRoleColor",
    description: "displays the user's highest role color",
    returns: "?string",
    brackets: true,
    optional: true,
    fields: [{
        name: "guildID",
        description: "the guild to get the user from",
        type: "string"
    }, {
        name: "userID",
        description: "the user to get the highest color from",
        type: "string"
    }],
    execute: async d => {
        if (!d.value.inside) {
            return d.deflate(d.message?.member?.displayHexColor ?? "")
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
        
        return d.deflate(member.displayHexColor)
    }
}