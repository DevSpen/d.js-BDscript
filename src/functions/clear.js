module.exports = {
    name: "$clear",
    brackets: true,
    execute: async d => {
        const [
            channelID,
            amount,
            userID,
            showTotal = "no"
        ] = (await d.resolveArray()) || []
        
        if (channelID === undefined) return undefined
        
        const channel = d.client.channels.cache.get(channelID)
        
        if (channel === undefined) return d.sendError("channel ID", channelID)
        
        if (userID) {
            const messages = await channel.messages.fetch({
                limit: 100
            }).catch(err => null)
            
            if (!messages) return d.sendError(":x: Failed to fetch messages!")
            
            const msgs = await channel.bulkDelete(messages.filter(m => m.author?.id === userID)).catch(err => null)
            
            if (!msgs) return d.sendError(":x: Failed to delete messages!")
            
            return d.deflate(showTotal === "yes" ? msgs.size : "")
        }
        
        let n = Number(amount)
        
        let deleted = 0 
        
        while (n !== 0) {
            let t = n - 100 < 0 ? n : 100 
            
            n -= t 
            
            const msgs = await channel.messages.fetch({
                limit: t 
            }).catch(err => null)
            
            const total = await channel.bulkDelete(msgs, true).catch(err => null)
            
            if (!total) return d.sendError(":x: Failed to delete messages!")
            
            deleted += total.size
        }
        
        return d.deflate(showTotal === "yes"  ? deleted : "")
    }
}