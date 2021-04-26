module.exports = (client, message) => {
    const prefixes = Array.isArray(client.bot.options.prefix) ? client.bot.options.prefix : [client.bot.options.prefix]
    
    const prefix = prefixes.find(p => message.content.startsWith(p))
    
    if (!prefix) return 
    
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    
    const cmd = args.shift().toLowerCase() 
    
    const commands = client.bot.commands.get("command").filter(c => c.name === cmd || (c.aliases && c.aliases.includes(cmd)))
    
    if (!commands.size) return 
    
    for (const command of commands.array()) {
        client.bot.interpreter({
            message,
            args,
            command 
        })
    }
}