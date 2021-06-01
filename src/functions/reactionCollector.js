const ms = require("ms")

module.exports ={
    name: "$reactionCollector",
    description: "creates a reaction collector under a message.",
    examples: [`$reactionCollector[$channelID;$messageID;$authorID;60s;😔;
    $channelSendMessage[$channelID;$username[$data[userID]] reacted with $data[emoji] wow!]
;😱;
    $channelSendMessage[$channelID;$username[$data[userID]] reacted with $data[emoji]!]
;
    $channelSendMessage[$channelID;collector ended!]
]`],
    fields: [{
        name: "channelID",
        type: "string",
        description: "the channel where the message was sent in"
    }, {
        name: "messageID",
        type: "string",
        description: "the message to create this collector on"
    }, {
        name: "filter",
        type: "string",
        description: "given user IDs will be allowed to react to this collector, use `everyone` to let everyone react."
    }, {
        name: "time",
        description: "the time to wait before this collector stops",
        type: "string"
    }, {
        name: "emoji|code",
        type: "string",
        description: "the emoji and the code to execute when reacted with said emoji, separated by `;`, $data will contain 2 parameters which are `userID` and `emoji`"
    }, {
        name: "endCode",
        description: "code to execute once the collector stops",
        type: "string"
    }],
    brackets: true,
    execute: async d => {
        d = d.clone() 
        
        let [
            channelID,
            messageID,
            filter,
            time,
            ...fields
        ] = [...d.value.splits]
        
        channelID = await d.resolveCode(channelID)
        if (channelID === undefined) return undefined
        
        messageID = await d.resolveCode(messageID)
        if (messageID === undefined) return undefined
        
        filter = await d.resolveCode(filter)
        if (filter === undefined) return undefined
        
        time = await d.resolveCode(time)
        if (time === undefined) return undefined
        else time = ms(time)
        
        const channel = d.client.channels.cache.get(channelID)
        
        if (!channel) return d.sendError("channelID", channelID)
        
        const msg = await channel.messages.fetch(messageID).catch(err => null) 
        
        if (!msg) return d.sendError("messageID", messageID)
        
        let endCode;
        const data = {}
        
        while(fields.length) {
            let emoji = fields.shift()
            if (!fields.length) {
                endCode = emoji 
                break
            }
            emoji = await d.resolveCode(emoji)
            if (emoji === undefined) return undefined
            const code = fields.shift()
            data[emoji] = code 
        }
        
        const f = (r, u) => {
            return Object.keys(data).includes(r.emoji.toString()) && !u.bot && (filter === "everyone" ? true : filter.split(",").includes(u.id))
        }
        
        const collector = msg.createReactionCollector(f, {
            time
        })
        
        collector.on("collect", (r, u) => {
            d.container.pointTo = "reactionCollector"
            d.container.reactionCollector = {
                userID: u.id,
                emoji: r.emoji.toString()
            }
            d.resolveCode(data[r.emoji.toString()])
        })
        
        collector.once("end", () => {
            if (endCode) d.resolveCode(endCode)
        })
        
        return d.deflate() 
    }
}