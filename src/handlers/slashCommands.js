const { CommandInteraction } = require("discord.js");

module.exports = (client, interaction = new CommandInteraction()) => {
    const commands = client.bot.commands.get("slashCommand").filter(c => c.name === interaction.commandName)

    interaction.author = interaction.user

    for (const command of commands.array()) {
        client.bot.interpreter({
            client,
            message: interaction, 
            command,
            args: [],
            data: {
                slash_options: interaction.options
            }
        })
    }
}