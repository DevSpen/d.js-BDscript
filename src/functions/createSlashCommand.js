module.exports = {
    name: "$createSlashCommand",
    description: "creates a global or guild based slash comamnd, the data of this slash command is created using `<Bot>.createSlashCommand()`.",
    brackets: true,
    fields: [
        {
            name: "guildID",
            type: "string",
            description: "the guild to attach this slash command to, or `global` for global slash command."
        },
        {
            name: "slash name",
            description: "the slash command name that you created through `<Bot>.createSlashCommandData`.",
            type: "string"
        },
        {
            name: "returnID",
            type: "boolean",
            description: "whether to return the newly created slash command ID"
        }
    ],
    returns: "?string", 
    execute: async d => {
        const [
            guildID,
            name,
            returnID = "no"
        ] = (await d.resolveArray()) ?? [] 

        if (guildID === undefined) return undefined

        if (guildID === "global") {
            const data = d.client.bot.slash_commands_data.get(name)

            if (!data) return d.sendError(`slash command`, name)

            const slash = await d.client.application.commands.create(data).catch(() => null)

            if (!slash) return d.sendError(`:x: Failed to create slash command '${name}'!`)

            return d.deflate(returnID === "yes" ? slash.id : "")
        } else {
            const guild = d.client.guilds.cache.get(guildID)

            if (!guild) return d.sendError("guild ID", guildID)

            const data = d.client.bot.slash_commands_data.get(name)

            if (!data) return d.sendError(`slash command`, name)
            
            const slash = await guild.commands.create(data).catch(() => null)

            if (!slash) return d.sendError(`:x: Failed to create slash command '${name}'!`)

            return d.deflate(returnID === "yes" ? slash.id : "")
        }
    }
}