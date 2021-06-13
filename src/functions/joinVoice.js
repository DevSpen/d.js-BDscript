const { joinVoiceChannel } = require("@discordjs/voice")
const data = require("../main/data")

module.exports = {
    name: "$joinVoice",
    description: "joins to a voice channel.",
    fields: [{
        name: "channelID",
        description: "the channel to join",
        type: "string"
    }],
    brackets: true,
    execute: async (d) => {
        const channelID = await d.resolveAll()
        
        if (channelID === undefined) return undefined
        
        const channel = d.client.channels.cache.get(channelID)
        
        if (!channel) return d.sendError("channelID", channelID)
        
        const r = await joinVoiceChannel({ channelId: channel.id, guildId: channel.guild.id, adapterCreator: channel.guild.voiceAdapterCreator })
        
        if (!r) return d.sendError(`:x: Failed to join voice channel!`)
        
        return d.deflate()
    }
}