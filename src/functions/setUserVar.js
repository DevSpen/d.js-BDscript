module.exports = {
    name: "$setUserVar",
    brackets: true,
    execute: async d => {
        const [
            variable,
            value, 
            userID = d.message?.author?.id,
            guildID = d.message?.guild?.id
        ] = (await d.resolveArray()) || []
        
        if (variable === undefined) return undefined
        
        const data = await d.client.bot.db.get("main", `${userID}_${guildID}`)
        
        const val = data[variable]
        
        const type = typeof val 
        
        if (val === undefined) return d.sendError(`:x: Variable '${variable}' does not exist!`)
        
        data[variable] = type === "string" ? value : Number(value)
        
        data.type = "member"
        
        await d.client.bot.db.set("main", `${userID}_${guildID}`, data)
        return d.deflate() 
    }
}