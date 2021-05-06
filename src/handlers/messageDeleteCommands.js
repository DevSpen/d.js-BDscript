module.exports = async (client, message) => {
    client.bot.commands.get("deleteCommand")?.map(async command => {
        const data = message 
        
        const response = await client.bot.interpreter({ args: [], command, message: data }, true, "channel")
        
        client.bot.interpreter({
            args: message.content?.trim().split(/ +/g) ?? [],
            message: data,
            command,
            channel: client.channels.cache.get(response?.code) ?? message.channel 
        })
    })
}