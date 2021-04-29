module.exports = {
    name: "$setMessageVar",
    brackets: true,
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