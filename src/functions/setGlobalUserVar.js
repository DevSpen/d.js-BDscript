module.exports = {
    name: "$setGlobalUserVar",
    description: "sets a global user variable value",
    fields: [{
        name: "variable",
        type: "string",
        description: "the variable to set the value to"
    }, {
        name: "value",
        type: "any",
        description: "the value to set this for this variable"
    }, {
        name: "userID",
        type: "string",
        description: "the user ID to set this variable value to" 
    }],
    brackets: true,
    execute: async d => {
        const [
            variable,
            value, 
            userID = d.message?.author?.id
        ] = (await d.resolveArray()) || []
        
        if (variable === undefined) return undefined
        
        const data = await d.client.bot.db.get("main", userID)
        
        const val = data[variable]
        
        const type = typeof val 
        
        if (val === undefined) return d.sendError(`:x: Variable '${variable}' does not exist!`)
        
        data[variable] = type === "string" ? value : Number(value)
        
        data.type = "user"
        
        await d.client.bot.db.set("main", userID, data)
        return d.deflate() 
    }
}