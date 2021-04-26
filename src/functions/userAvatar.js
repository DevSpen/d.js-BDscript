module.exports = {
    name: "$userAvatar",
    optional: true,
    brackets: true,
    execute: async d => {
        if (d.value.inside) {
            const [
                userID,
                size = "2048",
                dynamic = "yes"
            ] = (await d.resolveArray()) || []
            
            if (userID === undefined) return undefined
            
            const user = await d.client.users.fetch(userID).catch(err => null)
            
            if (!user) return d.sendError("userID", userID)
            
            return d.deflate(d.value.id, user.displayAvatarURL({
                dynamic: dynamic === "yes",
                size: Number(size) || 2048
            }))
        } else {
            return d.deflate(d.value.id, d.message?.author.displayAvatarURL({
                dynamic: true
            }) || "")
        }
    }
}