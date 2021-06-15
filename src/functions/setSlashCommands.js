const Function = require("../structures/Function");

module.exports = new Function({
    name: "$setSlashCommands",
    description: "set given slash commands globally or to given guild.",
    brackets: true,
    fields: [
        {
            name: "global|guildID",
            description: "whether these slash commands are being set globally or to a guild.",
            type: "string"
        },
        {
            name: "slash command names",
            description: "the slash command names (from their created data) to set, separated by `;`",
            type: "string"
        }
    ],
    execute: async d => {
        const [
            guildID,
            ...names 
        ] = (await d.resolveArray()) ?? []

        if (guildID === undefined) return undefined

        const slashes = names.map(n => d.bot.slash_commands_data.get(n))

        if (slashes.includes(undefined)) return d.sendError(`slash command name`, names.filter(a => !d.bot.slash_commands_data.has(a)).join(", "))

        if (guildID !== "global") {
            const guild = d.client.guilds.cache.get(guildID)

            if (!guild) return d.sendError(`guild ID`, guildID)

            const commands = await guild.commands.set(slashes).catch(() => null)

            if (!commands) return d.sendError(`:x: Failed to set slash commands!`)
        } else {
            const commands = await d.client.application.commands.set(slashes).catch(() => null)

            if (!commands) return d.sendError(`:x: Failed to set slash commands!`)
        }

        return d.deflate()
    }
})