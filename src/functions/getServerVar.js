module.exports = {
    name: "$getServerVar",
    brackets: true,
    description: "gets a server variable value",
    fields: [{
        name: "variable",
        type: "string",
        description: "the variable name"
    }, {
        name: "guildID",
        type: "string",
        description: "the server to get the variable value from"
    }],
    returns: "?number|?string",
    execute: async d => {
        const [
            variable,
            guildID = d.message?.guild?.id
        ] = (await d.resolveArray()) || []
        
        if (variable === undefined) return undefined
        
        const data = await d.client.bot.db.get("main", guildID)
        
        const val = data[variable]
        
        if (val === undefined) return d.sendError(`:x: Variable '${variable}' does not exist!`)
        
        return d.deflate(val) 
    }
}