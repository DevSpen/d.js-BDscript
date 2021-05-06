const regexes = require("../utils/regexes")

module.exports = {
    name: "$messageExists",
    brackets: true,
    fields: [{
        name: "channelID",
        type: "string",
        description: "the channel where this message is in"
    }, {
        name: "messageID",
        type: "string",
        description: "the message to check for"
    }],
    returns: "boolean",
    description: "checks whether a messsge exists",
    execute: async d => {
        const [
            channelID,
            messageID
        ] = (await d.resolveArray()) || []
        
        if (channelID === undefined) return  
        const channel = d.client.channels.cache.get(channelID)
        
        if (!channel) return d.sendError("channelID", channelID)
        
        if (!regexes.ID.test(messageID)) {
            return d.deflate(false)
        }
        
        const msg = await channel.messages.fetch(messageID).catch(err => null) 
        
        return d.deflate(Boolean(msg)) 
    }
}