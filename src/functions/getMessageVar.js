module.exports = {
    name: "$getMessageVar",
    brackets: true,
    description: "gets a message variable value",
    fields: [{
        name: "variable",
        type: "string",
        value: "the variable name"
    }, {
        name: "messageID",
        type: "string",
        value: "the message to get the variable value from"
    }],
    returns: "?number|?string",
    execute: async d => {
        const [
            variable,
            messageID = d.message?.id
        ] = (await d.resolveArray()) || []
        
        if (variable === undefined) return undefined
        
        const data = await d.client.bot.db.get("main", messageID)
        
        const val = data[variable]
        
        if (val === undefined) return d.sendError(`:x: Variable '${variable}' does not exist!`)
        
        return d.deflate(val) 
    }
}