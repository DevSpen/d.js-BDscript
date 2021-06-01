module.exports = async (client) => {
    client.bot.commands.get("readyCommand")?.map(async command => {
        const data = {
            client
        }
        
        const response = await client.bot.interpreter({ args: [], command, message: data }, true, "channel")
        
        data.channel = client.channels.cache.get(response?.code)
        
        client.bot.interpreter({
            args: [],
            message: data,
            command
        })
    })
}