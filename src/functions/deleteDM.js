module.exports = {
    name: "$deleteDM",
    description: "Deletes the DM channel with the given user (if one has been created).",
    brackets: true,
    optional: true,
    fields: [{
        name: "userID",
        description: "The user to delete the DM channel for.",
        type: "string"
    }, {
        name: "returnChannelID",
        description: "whether to return the DM channel ID upon successful deletion.",
        type: "boolean"
    }],
    returns: "?string",
    execute: async d => {
        if (!d.value.inside) {
            const dm = await d.message?.author?.deleteDM().catch(err => null)
            
            if (!dm) return d.sendError(`:x: Failed to delete DM channel!`)
            
            return d.deflate()
        }
        
        const [
            userID,
            returnID = "no"
        ] = (await d.resolveArray()) || []
        
        if (userID === undefined) return undefined
        
        const user = await d.client.users.fetch(userID).catch(err => null)
        
        if (!user) return d.sendError("userID", userID)
        
        const dm = await user.deleteDM().catch(err => null)
            
        if (!dm) return d.sendError(`:x: Failed to delete DM channel!`)
        
        return d.deflate(returnID === "yes" ? dm.id : "")
    }
}
