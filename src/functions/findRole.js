const regexes = require("../utils/regexes")

module.exports = {
    name: "$findRole",
    brackets: true,
    description: "finds a role in a server by using either its ID, name or mention.",
    returns: "?string",
    fields: [{
        name: "guildID",
        type: "string",
        description: "the guild to find the role in"
    }, {
        name: "option",
        type: "string",
        description: "the role ID, mention or name"
    }],
    execute: async d => {
        const [
            guildID,
            option
        ] = (await d.resolveArray()) || []
        
        if (guildID === undefined) return undefined
        
        const guild = d.client.guilds.cache.get(guildID)
        
        if (!guild) return d.sendError("guildID", guildID)
        
        const role = guild.roles.cache.get(option.replace(/[<>@&]/g, "")) ?? guild.roles.cache.find(r => r.name === option)
        
        return d.deflate(role?.id ?? "")
    }
}