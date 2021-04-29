module.exports = {
    name: "$deleteServerData",
    brackets: true,
    execute: async d => {
        const [
            guildID = d.message?.guild?.id
        ] = (await d.resolveArray()) || []
        
        if (guildID === undefined) return undefined
        
        await d.client.bot.db.delete("main", guildID)
        
        return d.deflate()
    }
}