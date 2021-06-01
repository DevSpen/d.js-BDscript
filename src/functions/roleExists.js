const regexes = require("../utils/regexes")

module.exports = {
    name: "$roleExists",
    brackets: true,
    description: "check whether or not given role ID exists in a guild",
    fields: [{
        name: "guildID",
        type: "string",
        description: "the guild to check for the role"
    }, {
        name: "roleID",
        type: "string",
        description: "the role to check for"
    }],
    returns: "boolean",
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