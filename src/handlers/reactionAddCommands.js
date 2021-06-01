module.exports = async (client, reaction, user) => {
    client.bot.commands.get("reactionAddCommand")?.map(async command => {
        const data = reaction.message 
        
        if (!data.author) await data.fetch()
        
        const response = await client.bot.interpreter({ args: [], command, message: data }, true, "channel")
        
        client.bot.interpreter({
            args: data.content?.trim().split(/ +/g) ?? [],
            message: data,
            command,
            channel: client.channels.cache.get(response?.code) ?? data.channel, 
            reaction,
            user 
        })
    })
}