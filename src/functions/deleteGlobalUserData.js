module.exports = {
    name: "$deleteGlobalUserData",
    brackets: true,
    description: "deletes all the variable values for given user",
    brackets: true,
    fields: [{
        name: "userID",
        description: "the user to delete the data from",
        type: "string"
    }],
    execute: async d => {
        const [
            userID = d.message?.author?.id
        ] = (await d.resolveArray()) || []
        
        if (userID === undefined) return undefined
        
        await d.client.bot.db.delete("main", userID)
        
        return d.deflate()
    }
}