module.exports = {
    name: "$sendDM",
    fields: [{
        name: "userID",
        type: "string",
        description: "the user to send this message to"
    }, {
        name: "message",
        type: "string",
        description: "the message to send to this user"
    }, {
        name: "returnMessageID",
        description: "whether to return the DM message ID",
        type: "boolean"
    }],
    returns: "?string",
    description: "sends a DM to an user",
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