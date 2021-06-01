module.exports = async (client, guild, song) => {
    client.bot.commands.get("musicEndCommand")?.map(async command => {
        const data = {
            client,
            guild,
            channel: client.bot.ytdl_servers.get(guild.id).text 
        }
        
        const response = await client.bot.interpreter({ args: [], command, message: data }, true, "channel")
        
        client.bot.interpreter({
            args: [],
            message: data,
            mainChannel: client.channels.cache.get(response?.code) ?? data.channel,
            command,
            data: {
                song 
            }
        })
    })
}