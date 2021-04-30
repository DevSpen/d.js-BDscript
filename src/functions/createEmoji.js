module.exports = {
    name: "$createEmoji",
    brackets: true,
    description: "creates a emoji in a guild",
    returns: "?string",
    fields: [{
        name: "guildID",
        type: "string",
        description: "the guild to create the emoji on"
    }, {
        name: "name",
        type: "string",
        description: "the name for the emoji"
    }, {
        name: "url",
        type: "string",
        description: "the url for the emoji"
    }, {
        name: "reason",
        type: "string",
        description: "the reason for creating this emoji"
    }, {
        name: "returnEmote",
        type: "boolean",
        description: "whether to return the newly created emoji"
    }, {
        name: "roles",
        type: "string",
        description: "role or roles to whitelist separated by `;`"
    }],
    execute: async d => {
        const [
            guildID,
            name,
            url,
            reason, 
            returnEmote = "no", 
            ...roles
        ] = (await d.resolveArray()) || []
        
        if (guildID === undefined) return undefined
        
        const guild = d.client.guilds.cache.get(guildID)
        
        if (!guild) return d.sendError("guildID", guildID)
        
        const emote = await guild.emojis.create(url, name, {
            roles,
            reason 
        }).catch(err => null)
        
        if (!emote) return d.sendError(`:x: Failed to create emote!`)
        
        return d.deflate(returnEmote === "yes" ? emote.toString() : "")
    }
}