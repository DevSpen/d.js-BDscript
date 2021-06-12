const Discord = require("discord.js")

module.exports = {
    name: "$clearEmbed",
    brackets: true,
    optional: true,
    fields: [
        {
            name: "embed index",
            description: "the index of the embed to delete.",
            type: "number"
        }
    ],
    description: "clears current built embed or all the embeds", 
    execute: async d => {
        if (d.value.inside) {
            const n = await d.resolveAll()

            d.container.embeds = d.container.embeds.filter((_, y) => y !== Number(n) - 1)

            return d.deflate()
        }

        d.container.embed = new Discord.MessageEmbed() 
        
        return d.deflate()
    }
}