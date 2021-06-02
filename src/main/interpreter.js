const Discord = require("discord.js")

module.exports = async (client, data = {}, returnCode = false, pointer = "code") => {
    const command = data.command
    
    if (!command) return undefined 
    
    if (client.bot.options.users && data.message?.author?.id && !client.bot.options.users.includes(data.message?.author?.id)) {
        return undefined
    }
    
    if (client.bot.options.respondToBots === false && data.message?.author?.bot === true) {
        return undefined
    }
    
    if (client.bot.options.guildOnly === true && data.message?.channel?.type === "dm") {
        return undefined
    }

    Object.entries(require("../prototypes/Objects")).map(full => data[full[0]] = full[1].bind(null, data))
    
    data.client = client 
    
    data.startedAt = Date.now() 
    
    data.channel = data.channel ?? data.message?.channel
    
    data.mainChannel = data.mainChannel ?? data.message?.channel 
    
    data.container = {
        randoms: {},
        keywords: {}, 
        randomTexts: {}, 
        splits: [], 
        randomStrings: {}, 
        invites: {},
        requests: {}, 
        array: pointer === "code" ? command.compiled.data : command.compiledName.data, 
        code: pointer === "code" ? command.compiled.code : command.compiledName.code, 
        embed: new Discord.MessageEmbed() 
    }
    
    for (const value of data.container.array) {
        data.value = value 
        data.backup = value
        const res = await value.func.execute(data) 
        if (!res) return 
        else {
            data.container.code = data.container.code.replace(res.id, res.with)
            if (data.container.return) {
                return undefined
            }
            
            if (res.stop) {
                data.container.code = await data.resolveFields(res.stop, res.code)
                break
            }
        }
    }
   
    if (returnCode) return data.container
    
    if (data.channel) {
        const m = await client.bot.resolveAPIMessage(
            data.container.reply ? data.message : data.channel, 
            data.container, 
            undefined, 
            data.container.reply ? "reply" : "send"
        ) 
    }
}