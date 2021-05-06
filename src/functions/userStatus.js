module.exports = {
    name: "$userStatus",
    description: "the user's status, requires presences intent",
    fields: [{
        name: "userID",
        description: "the user to get the status",
        type: "string"
    }],
    returns: "string",
    brackets: true,
    optional: true,
    execute: async d => {
        if (!d.value.inside) {
            return d.deflate(d.message?.author?.presence.status ?? "")
        } 
        
        const userID = await d.resolveAll()
        
        if (userID === undefined) return undefined
        
        const user = await d.client.users.fetch(userID).catch(err => null)
        
        if (!user) return d.sendError("userID", userID)
        
        return d.deflate(user.presence.status ?? "")
    }
}