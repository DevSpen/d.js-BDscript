module.exports = {
    name: "$mentionedChannels",
    brackets: true,
    execute: async d => {
        if (d.value.fields.length) {
            const [n, displayChannelID = "no"] = (await d.resolveArray()) || []
            
            if (typeof n === "undefined") return undefined 
            
            const channel = d.message.mentions ? d.message.mentions.channels.array()[Number(n) - 1] : undefined
            
            return d.deflate(d.value.id, channel ? channel.id : displayChannelID === "yes" && d.message.channel ? d.message.channel.id || "" : "")
        } else {
            const [n, displayChannelID = "no"] = d.value.inside.split(";")
            
            const channel = d.message.mentions ? d.message.mentions.channels.array()[Number(n) - 1] : undefined
            
            return d.deflate(d.value.id, channel ? channel.id : displayChannelID === "yes" && d.message.channel ? d.message.channel.id || "" : "")
        }
    }
}