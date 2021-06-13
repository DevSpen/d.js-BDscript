const { Client, Guild } = require("discord.js")

/**
 * 
 * @param {Client} client 
 * @param {Guild} guild 
 */
module.exports = async (client, guild) => {
    client.bot.commands.get("botLeaveCommand")?.map(async command => {
        const data = {
            guild: guild,
            author: client.user,
            member: guild.me,
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