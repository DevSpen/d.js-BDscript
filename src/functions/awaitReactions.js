const ms = require("ms")
const Discord = require("discord.js")

module.exports = {
    name: "$awaitReactions",
    brackets: true,
    execute: async d => {
        let [
            channelID,
            messageID,
            filter,
            time,
            reaction,
            max,
            code,
            error
        ] = d.value.splits 
        
        channelID = await d.resolveCode(channelID)
        
        if (!channelID) return 
        
        const channel = d.client.channels.cache.get(channelID)
        
        messageID = await d.resolveCode(messageID)
        
        if (messageID === undefined) return 
        
        const msg = await channel.messages.fetch(messageID).catch(err => null) 
        
        if (!msg) return d.sendError("messageID", messageID)
        
        if (channel === undefined) return d.sendError("channel ID", channelID)
        
        filter = await d.resolveCode(filter)
        
        if (filter === undefined) return undefined
        
        time = await d.resolveCode(time)
        
        if (time === undefined) return undefined
        
        reaction = await d.resolveCode(reaction)
        
        if (reaction === undefined) return undefined
        
        max = await d.resolveCode(max)
        
        if (max === undefined) return undefined
        
        const users = new Discord.Collection()
        
        const collector = msg.createReactionCollector((r, u) => {
            return r.emoji.toString() === reaction && d.client.user.id !== u.id && (filter === "everyone" ? true : filter.split(",").some(id => id.trim() === u.id))
        }, {
            time: ms(time)
        })
        
        collector.on("collect", (r, u) => {
            users.set(u.id, u)
            if (users.size === Number(max)) collector.stop() 
        })
        
        collector.once("end", () => {
            if (users.size < Number(max)) {
                return d.resolveCode(error)
            } else {
                d.container.pointTo = "awaitReactions"
                d.container.awaitReactions = {
                    userID: users.firstKey()
                }
                
                if (users.size > 1) {
                    users.array().slice(1).map((u, i) => d.container.awaitReactions[`userID${i+2}`] = u.id)
                }
                
                d.resolveCode(code)
            }
        })

        
        return d.deflate()
    }
}