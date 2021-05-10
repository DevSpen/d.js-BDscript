module.exports = {
    brackets: true,
    optional: true,
    returns: "boolean",
    description: "checks whether or not an user got their dms enabled",
    fields: [{
        name: "userID",
        type: "string",
        description: "the user to check dm"
    }],
    name: "$isUserDMEnabled",
    description: "",
    execute: async d => {
        if (!d.value.inside) {
            const code = await d.message?.author?.send().catch(err => err.code)
            
            return d.deflate(code === 50006)
        }
        
        const userID = await d.resolveAll()
        
        if (userID === undefined) return undefined
        
        const user = await d.client.users.fetch(userID).catch(err => null)
        
        if (!user) return d.sendError("userID", userID)
        
        const code = await user.send().catch(err => err.code)
        
        return d.deflate(code === 50006)
    }
}