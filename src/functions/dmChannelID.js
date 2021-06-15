module.exports = {
    name: "$dmChannelID",
    optional: true,
    description: "Returns a user's DM channel ID (if one exists).",
    fields: [{
        name: "userID",
        type: "string",
        description: "The user to get the DM channel ID for."
    }],
    returns: "?string",
    brackets: true,
    execute: async d => {
        if (d.value.inside) {
            const userID = await d.resolveAll()
    
            if (userID === undefined) return undefined
            
            const user = await d.client.users.fetch(userID).catch(err => null)
            
            if (!user) return d.sendError("userID", userID)
            
            return d.deflate(d.value.id, user.dmChannel?.id || "")
        } else {
            return d.deflate(d.value.id, d.message?.author?.dmChannel?.id || "")
        }
    }
}
