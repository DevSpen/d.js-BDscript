module.exports = {
    name: "$createWebhook",
    returns: "string",
    description: "creates a webhook and returns its url",
    fields: [{
        name: "channelID",
        type: "string",
        description: "the channel to create the webhook in"
    }, {
        name: "name",
        type: "string",
        description: "the name for the webhook"
    }, {
        name: "avatar",
        type: "string",
        description: "the avatar url for this wenhook"
    }],
    brackets: true,
    execute: async d => {
        const [
            channelID,
            name,
            avatar
        ] = (await d.resolveArray()) ?? []
        
        if (channelID === undefined) return undefined
        
        const channel = d.client.channels.cache.get(channelID)
        
        if (!channel) return d.sendError("channelID", channelID)
        
        const web = await channel.createWebhook?.(name, { avatar }).catch(err => null)
        
        if (!web) return d.sendError(":x: Failed to create webhook!")
        
        return d.deflate(web.url)
    }
}