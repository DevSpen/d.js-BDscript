module.exports = {
    name: "$resetUserVar",
    brackets: true,
    fields: [{
        name: "guildID",
        type: "string",
        description: "the guild to reset the variable in" 
    }, {
        name: "variable",
        type: "string",
        description: "the variable to reset"
    }],
    description: "reset a server users variable value",
    execute: async d => {
        const [
            guildID,
            variable
        ] = (await d.resolveArray()) || []
        
        if (guildID === undefined) return undefined
        
        const guild = d.client.guilds.cache.get(guildID)
        
        if (!guild) return d.sendError("guildID", guildID)
        
        const varData = d.client.bot.variables.find(c => c.name === variable)
        
        if (!varData) return d.sendError(`:x: Variable ${variable} does not exist`)
        
        const data = {}
        
        data[variable] = varData.defaultValue 
        
        await d.client.bot.db.updateWithQuery("main", data, {
            where: `id LIKE '%_${guildID}' AND type = 'member'`
        })
        
        return d.deflate() 
    }
}