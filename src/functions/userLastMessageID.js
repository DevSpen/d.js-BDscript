module.exports = {
    name: "$userLastMessageID",
    description: "the user's last message ID",
    optional: true,
    brackets: true,
    fields: [{
        name: "userID",
        description: "the user to get last message from",
        type: "string"
    }],
    returns: "?string",
    execute: async d => {
        if (!d.value.inside) {
            return d.deflate(d.message?.author?.lastMessageID ?? "")
        }
        
        const userID = await d.resolveAll()
        
        if (userID === undefined) return undefined
        
        const user = await client.users.fetch(userID).catch(err => null)
        
        if (!user) return d.sendError("userID", userID)
        
        return d.deflate(user.lastMessageID ?? "")
    }
}