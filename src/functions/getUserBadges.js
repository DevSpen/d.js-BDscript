module.exports = {
    name: "$getUserBadges",
    optional: true,
    brackets: true,
    execute: async d => {
        if (d.value.inside) {
            const [userID, separator = ", "] = (await d.resolveArray()) || []
            
            if (userID === undefined) return undefined
            
            const user = await d.client.users.fetch(userID).catch(err => null)
            
            if (!user) return d.sendError("userID", userID)
            
            if (!user.flags) await user.fetchFlags() 
            
            return d.deflate(d.value.id, user.flags.toArray().goof().join(separator) || "")
        } else {
            return d.deflate(d.value.id, d.message?.author?.flags?.toArray().goof().join(", ") || "")
        }
    }
}