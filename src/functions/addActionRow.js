const { MessageActionRow } = require("discord.js")

module.exports = {
    name: "$addActionRow",
    description: "any new button added after this function will be under this action row",
    execute: async d => {
        d.container.components.push(new MessageActionRow())

        return d.deflate()
    }
}