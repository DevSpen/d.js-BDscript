const Discord = require("discord.js")

module.exports = async (client, data = {}, returnCode = false, pointer = "code") => {
    const command = data.command 
    
    if (!command) return undefined 
    
    if (client.bot.options.respondToBots === false && data.message?.author?.bot === true) {
        return undefined
    }
    
    if (client.bot.options.guildOnly === true && data.message?.channel?.type === "dm") {
        return undefined
    }
    
    data.client = client 
    
    data.startedAt = Date.now() 
    
    data.channel = data.channel || data.message?.channel
    
    data.mainChannel = data.message?.channel 
    data.container = {
        randoms: {},
        keywords: {}, 
        randomTexts: {}, 
        splits: [], 
        randomStrings: {}, 
        requests: {}, 
        array: pointer === "code" ? data.command.compiled.data : data.command.compiledName.data, 
        code: pointer === "code" ? data.command.compiled.code : data.command.compiledName.code, 
        embed: new Discord.MessageEmbed() 
    }
    
    for (const value of data.container.array) {
        data.value = value 
        const res = await value.func.execute(data) 
        if (!res) return undefined
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
        const m = await client.bot.resolveAPIMessage(data.channel, data.container) 
    }
}