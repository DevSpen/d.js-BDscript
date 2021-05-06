module.exports = {
    name: "$mentionedChannels",
    description: "returns mentioned channel ID",
    returns: "?string",
    fields: [{
        name: "mention number",
        type: "number",
        description: "the mentioned channel's ID to return"
    }, {
        name: "displayChannelID",
        type: "boolean",
        description: "whether to return current channel ID if no mention was found"
    }],
    optional: true,
    brackets: true,
    execute: async d => {
        if (!d.value.inside) {
            return d.deflate(d.message?.mentions?.channels.map(r => r.id).join(", ") ?? "")
        }
        
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