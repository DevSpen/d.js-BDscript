module.exports = {
    name: "$getMessageVar",
    brackets: true,
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