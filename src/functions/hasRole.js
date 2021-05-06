module.exports = {
    name: "$hasRole",
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
        name: "roles",
        type: "string",
        description: "the role or roles to check for separated by `;`"
    }],
    description: "checks whether a user has given role",
    brackets: true,
    execute: async d => {
        const [
            guildID,
            userID,
            ...roles
        ] = (await d.resolveArray()) || []
        
        if (guildID === undefined) return undefined
        
        const guild = d.client.guilds.cache.get(guildID)
            
        if (!guild) return d.sendError("guildID", guildID)
            
        const member = await guild.members.fetch(userID).catch(err => null)
          
        if (!member) return d.sendError("userID", userID)
        
        return d.deflate(roles.every(id => member.roles.cache.has(id))) 
    }
}