module.exports = async (client, oldm, newm) => {
    client.bot.commands.get("updateCommand")?.map(async command => {
        const data = newm 
        
        const response = await client.bot.interpreter({ args: [], command, message: data }, true, "channel")
        
        client.bot.interpreter({
            args: newm.content?.trim().split(/ +/g) ?? [],
            message: data,
            command,
            channel: client.channels.cache.get(response?.code) ?? newm.channel, 
            data: {
                old_message: oldm 
            }
        })
    })
}