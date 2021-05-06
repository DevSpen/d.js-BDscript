module.exports = {
    name: "$setBotAvatar",
    description: "sets the bot's avatar",
    fields: [{
        name: "url",
        type: "string",
        description: "the avatar url for the new avatar"
    }],
    brackets: true,
    execute: async d => {
        const url = await d.resolveAll()
        
        if (url === undefined) return undefined
        
        const b = await d.client.user.setAvatar(url).catch(err => null)
        
        if (!b) return d.sendError(":x: Failed to change bot avatar!")
        
        return d.deflate()
    }
}