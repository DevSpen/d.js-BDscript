const Discord = require("discord.js")

module.exports = {
    name: "$clearEmbed",
    execute: async d => {
        d.container.embed = new Discord.MessageEmbed() 
        
        return d.deflate()
    }
}