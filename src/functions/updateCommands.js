module.exports = {
    name: "$updateCommands",
    description: "update commands that were loaded through built-in command handler",
    execute: async d => {
        const res = d.client.bot.manager.refresh()
        if (!res) return d.sendError(`:x: Failed to refresh commands!`)
        return d.deflate()
    }
}