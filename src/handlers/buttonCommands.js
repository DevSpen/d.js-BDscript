const { CommandInteraction, MessageComponentInteraction } = require("discord.js");

module.exports = (client, interaction = new MessageComponentInteraction()) => {
    const commands = client.bot.commands.get("buttonCommand")

    interaction.author = interaction.user

    for (const command of commands.array()) {
        client.bot.interpreter({
            client,
            message: interaction, 
            command,
            args: [],
            data: {
                interaction 
            }
        })
    }
}