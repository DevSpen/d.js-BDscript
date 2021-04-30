module.exports = {
    name: "$setMessageVar",
    brackets: true,
    description: "sets a message variable value",
    fields: [{
        name: "variable",
        type: "string",
        description: "the variable to set the value to"
    }, {
        name: "value",
        type: "any",
        description: "the value to set this for this variable"
    }, {
        name: "messageID",
        type: "string",
        description: "the message ID to set this variable value to" 
    }],
    execute: async d => {
        const [
            variable,
            value, 
            messageID = d.message?.id
        ] = (await d.resolveArray()) || []
        
        if (variable === undefined) return undefined
        
        const data = await d.client.bot.db.get("main", messageID)
        
        const val = data[variable]
        
        const type = typeof val 
        
        if (val === undefined) return d.sendError(`:x: Variable '${variable}' does not exist!`)
        
        data[variable] = type === "string" ? value : Number(value)
        
        data.type = "message"
        
        await d.client.bot.db.set("main", messageID, data)
        
        return d.deflate() 
    }
}