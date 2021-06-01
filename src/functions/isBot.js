module.exports = {
    name: "$isBot",
    optional: true,
    description: "checks whether given user ID is a bot",
    fields: [{
        name: "userID",
        type: "string",
        description: "the user to check for"
    }],
    returns: "?boolean",
    brackets: true,
    execute: async d => {
        if (d.value.inside) {
            const userID = await d.resolveAll()
            
            if (userID === undefined) return undefined
            
            const user = await d.client.users.fetch(userID).catch(err => null)
            
            if (!user) return d.sendError("userID", userID)
            
            return d.deflate(d.value.id, user.bot)
        } else {
            return d.deflate(d.value.id, d.message?.author?.bot ?? "")
        }
    }
}