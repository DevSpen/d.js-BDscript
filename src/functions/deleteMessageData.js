module.exports = {
    name: "$deleteMessageData",
    brackets: true,
    execute: async d => {
        const [
            messageID = d.message?.id 
        ] = (await d.resolveArray()) || []
        
        if (messageID === undefined) return undefined
        
        await d.client.bot.db.delete("main", messageID)
        
        return d.deflate()
    }
}