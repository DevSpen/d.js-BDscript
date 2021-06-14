module.exports = {
    name: "$username",
    optional: true,
    description: "the user's username",
    fields: [{
        name: "userID",
        type: "string",
        description: "the user to get the username"
    }],
    returns: "?string",
    brackets: true,
    execute: async d => {
        if (d.value.inside) {
            const userID = await d.resolveAll()
    
            if (userID === undefined) return undefined
            
            const user = await d.client.users.fetch(userID).catch(err => null)
            
            if (!user) return d.sendError("userID", userID)
            
            return d.deflate(d.value.id, user.username || "")
        } else {
            return d.deflate(d.value.id, d.message?.author?.username || "")
        }
    }
}