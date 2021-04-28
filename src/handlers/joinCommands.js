module.exports = async (client, member) => {
    client.bot.commands.get("joinCommand")?.map(async command => {
        const data = {
            guild: member.guild,
            author: member.user,
            member,
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