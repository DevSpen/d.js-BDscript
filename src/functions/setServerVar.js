module.exports = {
    name: "$setServerVar",
    brackets: true,
    execute: async d => {
        const [
            variable,
            value, 
            guildID = d.message?.guild?.id
        ] = (await d.resolveArray()) || []
        
        if (variable === undefined) return undefined
        
        const data = await d.client.bot.db.get("main", guildID)
        
        const val = data[variable]
        
        const type = typeof val 
        
        if (val === undefined) return d.sendError(`:x: Variable '${variable}' does not exist!`)
        
        data[variable] = type === "string" ? value : Number(value)
        
        data.type = "guild"
        
        await d.client.bot.db.set("main", guildID, data)
        
        return d.deflate() 
    }
}