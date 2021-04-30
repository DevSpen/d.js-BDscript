module.exports = {
    name: "$createChannel",
    brackets: true,
    description: "creates a channel in a guild, you can leave empty not needed fields.",
    fields: [{
        name: "guildID",
        type: "string",
        description: "the guild to create this channel in"
    }, {
        name: "name",
        type: "string",
        description: "the name for the channel"
    }, {
        name: "type",
        type: "string",
        description: "the type for the channel"
    }, {
        name: "categoryID",
        type: "string",
        description: "the category where this channel will be located at"
    }, {
        name: "position",
        type: "string",
        description: "the position under the category"
    }, {
        name: "nsfw",
        type: "boolean",
        description: "whether this channeñ should be nsfw"
    }, {
        name: "topic",
        type: "string",
        description: "the topic for the channel"
    }, {
        name: "reason",
        type: "string",
        description: "the reason for creating this channel"
    }, {
        name: "returnChannelID",
        type: "boolean",
        description: "whether to return the created channel's ID"
    }, ],
    returns: "?string",
    execute: async d => {
        const [
            guildID,
            name,
            type,
            category,
            position,
            nsfw,
            topic,
            reason,
            returnID = "no"
        ] = (await d.resolveArray()) || []
        
        if (guildID === undefined) return undefined
        
        const guild = d.client.guilds.cache.get(guildID)
            
        if (!guild) return d.sendError("guildID", guildID)
        
        const ch = await guild.channels.create(name, {
            position: Number(position) || undefined,
            type: type || "text",
            topic: topic || undefined,
            parent: category || undefined,
            reason: reason || undefined,
            nsfw: nsfw === "yes"
        }).catch(err => null)
        
        if (!ch) return d.sendError(`:x: Failed to create channel!`)
        
        return d.deflate(returnID === "yes" ? ch.id : "")
    }
}