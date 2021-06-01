module.exports = async (client, message) => {
    const prefixes = client.bot.options.prefix 
    
    let prefix = client.bot.options.mentionAsPrefix && client.bot.MentionRegExp.test(message.content) ? message.content.match(client.bot.MentionRegExp)[0] : undefined
    
    if (prefix === undefined) {
        for (const prf of client.bot.options.prefix) {
            if (typeof prf === "string") {
                if (message.content.startsWith(prf)) {
                    prefix = prf 
                    break
                }
                continue
            }
            
            const p = await client.bot.interpreter({
                message,
                command: {
                    compiled: prf 
                }
            }, true)
            
            if (p === undefined) return undefined
            
            if (message.content.startsWith(p.code)) {
                prefix = p.code 
                break
            }
        }
    }
    
    if (prefix === undefined) return 
    
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