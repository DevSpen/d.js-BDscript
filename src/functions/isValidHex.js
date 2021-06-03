const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "$isValidHex",
    description: "checks whether a hex is valid",
    brackets: true,
    fields: [
        {
            name: "hex or int",
            description: "hex code or integer to check for",
            type: "any"
        }
    ],
    returns: "boolean",
    execute: async d => {
        const h = await d.resolveAll()

        if (h === undefined) return undefined

        try {
            const color = new MessageEmbed().setColor(h)

            if (!color && color !== 0) return d.deflate(false)
            
            return d.deflate(true)
        } catch (error) {
            return d.deflate(false)
        }
    }
}