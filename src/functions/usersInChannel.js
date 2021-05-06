module.exports = {
    name: "$usersInChannel",
    description: "returns a list of users in a voice channel",
    returns: "?string|?number",
    fields: [{
        name: "channelID",
        type: "string",
        description: "the voice channel to list users from"
    }, {
        name: "option",
        type: "string",
        description: "the option to return for each member, can be `mention`, `username`, `count`, etc..."
    }, {
        name: "separator",
        type: "string",
        description: "the separator for each user"
    }],
    brackets: true,
    execute: async d => {
        const [
            channelID,
            option = "username",
            separator = ", "
        ] = (await d.resolveArray()) || []
        
        if (channelID === undefined) return undefined
        
        const channel = d.client.channels.cache.get(channelID)
        
        if (!channel) return d.sendError("channelID", channelID)
        
        return d.deflate(option === "count" ? channel.members?.size ?? "" : channel.members?.map(m => option === "mention" ? m.toString() : m[option] ?? m.user[option] ?? "").join(separator) ?? "")
    }
}