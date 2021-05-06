module.exports = {
    name: "$getGlobalUserVar",
    description: "gets a global user variable value",
    fields: [{
        name: "variable",
        type: "string",
        description: "the variable name"
    }, {
        name: "userID",
        type: "string",
        description: "the user to get the variable value from"
    }],
    returns: "?number|?string",
    brackets: true,
    execute: async d => {
        const [
            variable,
            userID = d.message?.author?.id
        ] = (await d.resolveArray()) || []
        
        if (variable === undefined) return undefined
        
        const data = await d.client.bot.db.get("main", userID)
        
        const val = data[variable]
        
        if (val === undefined) return d.sendError(`:x: Variable '${variable}' does not exist!`)
        
        return d.deflate(val) 
    }
}