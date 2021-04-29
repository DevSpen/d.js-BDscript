module.exports = {
    name: "$addMessageReactions",
    brackets: true,
    execute: async d => {
        const [
            channelID,
            messageID,
            ...reactions
        ] = (await d.resolveArray()) || []
        
        const channel = d.client.channels.cache.get(channelID)
        
        if (!channel) return d.sendError("channelID", channelID)
        
        const msg = await channel.messages.fetch(messageID).catch(err => null) 
        
        if (!msg) return d.sendError("messageID", messageID)
        
        for (const r of reactions) {
            const add = await msg.react(r).catch(err => null)
            
            if (!add) return d.sendError(`:x: Failed to react with '${r}'`)
        }
        
        return d.deflate()
    }
}