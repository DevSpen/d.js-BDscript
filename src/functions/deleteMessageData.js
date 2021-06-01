module.exports = {
    name: "$deleteMessageData",
    description: "deletes all the variable values for given message",
    brackets: true,
    fields: [{
        name: "messageID",
        description: "the message to delete the data from",
        type: "string"
    }],
    execute: async d => {
        const [
            messageID = d.message?.id 
        ] = (await d.resolveArray()) || []
        
        if (messageID === undefined) return undefined
        
        await d.client.bot.db.delete("main", messageID)
        
        return d.deflate()
    }
}