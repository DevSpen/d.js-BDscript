module.exports = {
    name: "$userDevices",
    description: "the user's devices connected to discord, requires presences intent",
    fields: [{
        name: "userID",
        description: "the user to get the status",
        type: "string"
    }, {
        name: "separator",
        description: "the separator for each device",
        type: "string"
    }],
    returns: "?string",
    brackets: true,
    optional: true,
    execute: async d => {
        if (!d.value.inside) {
            return d.deflate(Object.keys(d.message?.author?.presence.clientStatus ?? {}).join(", ") ?? "")
        } 
        
        const [
            userID,
            separator = ", "
        ] = (await d.resolveArray()) || []
        
        if (userID === undefined) return undefined
        
        const user = await d.client.users.fetch(userID).catch(err => null)
        
        if (!user) return d.sendError("userID", userID)
        
        return d.deflate(Object.keys(user.presence.clientStatus ?? {}).join(separator) ?? "")
    }
}