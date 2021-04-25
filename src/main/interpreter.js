const Discord = require("discord.js")

module.exports = async (client, data = {}, returnCode = false) => {
    const command = data.command 
    
    if (!command) return undefined 
    
    data.client = client 
    
    data.channel = data.channel || data.message.channel
    
    data.mainChannel = data.message.channel 
    
    data.container = {
        array: data.command.compiled.data,
        code: data.command.compiled.code, 
        embed: new Discord.MessageEmbed() 
    }
    
    for (const value of data.container.array) {
        data.value = value 
        const res = await value.func.execute(data) 
        if (!res) return undefined
        else {
            data.container.code = data.container.code.replace(res.id, res.with)
            if (res.stop) {
                console.log(res) 
                data.container.code = await data.resolveFields(res.stop, res.code)
                break
            }
        }
    }
    
    const options = {} 
        
    if (data.container.embed.length) options.embed = data.container.embed 
        
    if (returnCode) return { content: code, options } 
    
    if (data.channel && (data.container.code.length || data.container.embed.length)) {
        const m = await data.channel.send(data.container.code, options).catch(err => null)
    }
}