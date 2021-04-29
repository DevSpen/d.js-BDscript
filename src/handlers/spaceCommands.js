module.exports = (client, message) => {
    client.bot.commands.get("spaceCommand")?.map(command => {
        client.bot.interpreter({
            message,
            command,
            args: message.content.trim().split(/ +/g) 
        })
    })
}