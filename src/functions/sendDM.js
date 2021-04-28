module.exports = {
    name: "$sendDM",
    brackets: true,
    execute: async d => {
        const [
            userID,
            message,
            returnID = "no"
        ] = (await d.resolveArray()) || []
        
        if (userID === undefined) return undefined
        
        const user = await d.client.users.fetch(userID).catch(err => null)
        
        if (!user) return d.sendError("userID", userID)
        
        const m = await d.client.bot.resolveAPIMessage(user, d.container.embed, message)
        
        return d.deflate(returnID === "yes" ? m?.id || "" : "")
    }
}