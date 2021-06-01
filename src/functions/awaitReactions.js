const ms = require("ms")
const Discord = require("discord.js")

module.exports = {
    name: "$awaitReactions",
    brackets: true,
    description: "await a reaction or reactions under given emoji, once reached given amount of reactions, the code field will be execute and $data will contain `userID` value with the user who reacted.\nIf awaiting multiple reactions under same emoji, $data will contain `userID`, `userID2`, `userID3`, etc...\nError code will be executed if the time ended and not enough reactions were collected.",
    fields: [{
        name: "channelID",
        type: "string",
        description: "the channel where the message was sent in"
    }, {
        name: "messageID",
        type: "string",
        description: "the message to await reactions on"
    }, {
        name: "filter",
        type: "string",
        description: "the user filter, or users that will be passed separated by commas.\nAlternatively `everyone` can be used to await reactions for everyone"
    }, {
        name: "time",
        type: "number",
        description: "the time to wait before ending the collector"
    }, {
        name: "emoji",
        type: "string",
        description: "the emoji to await reactions for"
    }, {
        name: "max",
        type: "number",
        description: "the amount of reactions to await (by different users)"
    }, {
        name: "code",
        type: "string",
        description: "the code to execute once all reactions are collected"
    }, {
        name: "error",
        type: "string",
        description: "the code to execute incase not enough reactions were collected"
    }], 
    execute: async d => {
        d = d.clone() 
        
        let [
            channelID,
            messageID,
            filter,
            time,
            reaction,
            max,
            code,
            error
        ] = [...d.value.splits] 
        
        channelID = await d.resolveCode(channelID)
        
        if (!channelID) return 
        
        const channel = d.client.channels.cache.get(channelID)
        
        if (channel === undefined) return d.sendError("channel ID", channelID)
        
        messageID = await d.resolveCode(messageID)
        
        if (messageID === undefined) return
        
        const msg = await channel.messages.fetch(messageID).catch(err => null) 
        
        if (!msg) return d.sendError("messageID", messageID)
        
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