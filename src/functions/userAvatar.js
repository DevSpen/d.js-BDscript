module.exports = {
    name: "$userAvatar",
    optional: true,
    brackets: true,
    description: "return user avatar url",
    fields: [{
        name: "userID",
        type: "string",
        description: "the user to get the avatar from"
    }, {
        name: "size",
        type: "number",
        description: "the size for the avatar"
    }, {
        name: "dynamic",
        type: "boolean",
        description: "whether the avatar should be animated if its a gif"
    }],
    returns: "string", 
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