module.exports = {
    name: "$getUserVar",
    description: "gets a server user variable value",
    fields: [{
        name: "variable",
        type: "string",
        value: "the variable name"
    }, {
        name: "userID",
        type: "string",
        value: "the user to get the variable value from"
    }, {
        name: "guildID",
        type: "string",
        value: "the guild to get this users variable value from"
    }],
    returns: "?number|?string",
    brackets: true,
    execute: async d => {
        const [
            variable,
            userID = d.message?.author?.id,
            guildID = d.message?.guild?.id
        ] = (await d.resolveArray()) || []
        
        if (variable === undefined) return undefined
        
        const data = await d.client.bot.db.get("main", `${userID}_${guildID}`)
        
        const val = data[variable]
        
        if (val === undefined) return d.sendError(`:x: Variable '${variable}' does not exist!`)
        
        return d.deflate(val) 
    }
}