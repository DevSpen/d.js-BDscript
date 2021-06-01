module.exports = {
    name: "$createDM",
    description: "creates a dm channel with given user",
    brackets: true,
    optional: true,
    fields: [{
        name: "userID",
        description: "the user to create the dm with",
        type: "string"
    }, {
        name: "returnChannelID",
        description: "whether to return the dm channel ID upon successful creation",
        type: "boolean"
    }],
    returns: "?string",
    execute: async d => {
        if (!d.value.inside) {
            const dm = await d.message?.author?.createDM().catch(err => null)
            
            if (!dm) return d.sendError(`:x: Failed to create DM channel!`)
            
            return d.deflate()
        }
        
        const [
            userID,
            returnID = "no"
        ] = (await d.resolveArray()) || []
        
        if (userID === undefined) return undefined
        
        const user = await d.client.users.fetch(userID).catch(err => null)
        
        if (!user) return d.sendError("userID", userID)
        
        const dm = await user.createDM().catch(err => null)
            
        if (!dm) return d.sendError(`:x: Failed to create DM channel!`)
        
        return d.deflate(returnID === "yes" ? dm.id : "")
    }
}