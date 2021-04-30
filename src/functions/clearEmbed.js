const Discord = require("discord.js")

module.exports = {
    name: "$clearEmbed",
    description: "clears current built embed", 
    execute: async d => {
        d.container.embed = new Discord.MessageEmbed() 
        
        return d.deflate()
    }
}