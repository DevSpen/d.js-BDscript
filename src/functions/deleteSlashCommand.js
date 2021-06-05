const { ID } = require("../utils/regexes")

module.exports = {
    name: "$deleteSlashCommand",
    description: "deletes a slash command",
    brackets: true,
    fields: [
        {
            name: "global | guildID",
            description: "leave it as `global` if the slash command is global, or provide a guild to remove the slash command from that specific guild.",
            type: "string"
        },
        {
            name: "name | ID",
            description: "the slash command name or ID",
            type: "string"
        }
    ],
    execute: async d => {
        const [
            type,
            option 
        ] = (await d.resolveArray()) ?? []

        if (type === undefined) return undefined

        if (type === "global") {
            if (ID.test(option)) {
                const c = await d.client.application.commands.delete(ID).catch(() => null)

                if (!c) return d.sendError(`slash command ID`, option)
            } else {
                const commands = await d.client.application.commands.fetch()

                const cmd = commands.find(c => c.name === type)

                if (!cmd) return d.sendError(`slash command name`, type)

                const c = await cmd.delete().catch(() => null)

                if (!c) return d.sendError(`:x: Failed to delete slash command!`)
            }
        } else {
            const guild = d.client.guilds.cache.get(type)

            if (!guild) return d.sendError(`guild ID`, type)

            if (ID.test(option)) {
                const c = await guild.commands.delete(ID).catch(() => null)

                if (!c) return d.sendError(`slash command ID`, option)
            } else {
                const commands = await guild.commands.fetch()

                const cmd = commands.find(c => c.name === option)

                if (!cmd) return d.sendError(`slash command name`, option)

                const c = await cmd.delete().catch(() => null)

                if (!c) return d.sendError(`:x: Failed to delete slash command!`)
            }
        }

        return d.deflate() 
    }
}