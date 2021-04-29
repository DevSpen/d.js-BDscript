const Discord = require("discord.js")

module.exports = {
    name: "$attachment",
    brackets: true,
    execute: async d => {
        const [
            url,
            name
        ] = (await d.resolveArray()) || []
        
        if (url === undefined) return undefined
        
        d.container.embed.attachFiles(new Discord.MessageAttachment(url, name))
        
        return d.deflate() 
    }
}