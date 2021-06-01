module.exports = {
    name: "$userTag",
    optional: true,
    brackets: true,
    description: "the user's tag",
    fields: [{
        name: "userID",
        type: "string",
        description: "the user to get the tag"
    }],
    returns: "?string",
    execute: async d => {
        if (d.value.inside) {
            const userID = await d.resolveAll()
            
            if (userID === undefined) return undefined
            
            const user = await d.client.users.fetch(userID).catch(err => null)
            
            if (!user) return d.sendError("userID", userID)
            
            return d.deflate(d.value.id, user.tag || "")
        } else {
            return d.deflate(d.value.id, d.message?.author?.tag || "")
        }
    }
}