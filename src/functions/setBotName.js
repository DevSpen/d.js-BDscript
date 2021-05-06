module.exports = {
    name: "$setBotName",
    description: "sets the bot's name",
    fields: [{
        name: "name",
        type: "string",
        description: "the new name for the bot"
    }],
    brackets: true,
    execute: async d => {
        const name = await d.resolveAll()
        
        if (name === undefined) return undefined
        
        const b = await d.client.user.setUsername(name).catch(err => null)
        
        if (!b) return d.sendError(":x: Failed to change bot name!")
        
        return d.deflate()
    }
}