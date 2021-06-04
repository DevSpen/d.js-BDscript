module.exports = {
    name: "$userLocale",
    optional: true,
    description: "The locale of the user's client.",
    fields: [{
        name: "userID",
        type: "string",
        description: "The user to get the data from."
    }],
    returns: "?string",
    brackets: true,
    execute: async d => {
        if (d.value.inside) {
            const userID = await d.resolveAll()
            
            if (userID === undefined) return undefined
            
            const user = await d.client.users.fetch(userID).catch(err => null)
            
            if (!user) return d.sendError("userID", userID)
            
            return d.deflate(d.value.id, user.locale || "")
        } else {
            return d.deflate(d.value.id, d.message?.author?.locale || "")
        }
    }
}


