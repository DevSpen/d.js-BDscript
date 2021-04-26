module.exports = {
    name: "$discriminator",
    optional: true,
    brackets: true,
    execute: async d => {
        if (d.value.inside) {
            const userID = await d.resolveAll()
            
            if (userID === undefined) return undefined
            
            const user = await d.client.users.fetch(userID).catch(err => null)
            
            if (!user) return d.sendError("userID", userID)
            
            return d.deflate(d.value.id, user.discriminator || "")
        } else {
            return d.deflate(d.value.id, d.message?.author?.discriminator || "")
        }
    }
}