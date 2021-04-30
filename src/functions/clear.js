module.exports = {
    name: "$clear",
    description: "clear an amount of messages in a channel",
    returns: "?number",
    fields: [{
        name: "channelID",
        type: "string",
        description: "the ID for this channel"
    }, {
        name: "amount",
        type: "number",
        description: "the amount of messages to delete"
    }, {
        name: "userID",
        type: "string",
        description: "the ID of the user to delete messages"
    }, {
        name: "showTotal",
        type: "boolean",
        description: "Whether or not return the amount of messages that were actually deleted"
    }],
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