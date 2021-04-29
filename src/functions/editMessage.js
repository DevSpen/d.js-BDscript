module.exports = {
    name: "$editMessage",
    brackets: true,
    optional: true,
    execute: async d => {
        let [
            channelID,
            messageID, 
            data,
            returnMessageID = "no"
        ] = (await d.resolveArray()) || []
        
        if (channelID === undefined) return undefined
        
        const channel = d.client.channels.cache.get(channelID)
        
        if (!channel) return d.sendError("channelID", channelID)
        
        const msg = await channel.messages.fetch(messageID).catch(err => null) 
        
        if (!msg) return d.sendError("messageID", messageID)
        
        const m = await d.client.bot.resolveAPIMessage(msg, d.container.embed, data, "edit")
        
        return d.deflate(returnMessageID === "yes" ? m?.id || "" : "")
    }
}