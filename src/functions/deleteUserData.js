module.exports = {
    name: "$deleteUserData",
    brackets: true,
    description: "deletes all the variable values for given server user",
    brackets: true,
    fields: [{
        name: "userID",
        description: "the user to delete the data from",
        type: "string"
    }],
    execute: async d => {
        const [
            userID = d.message?.author?.id,
            guildID = d.message?.guild?.id
        ] = (await d.resolveArray()) || []
        
        if (userID === undefined) return undefined
        
        await d.client.bot.db.delete("main", `${userID}_${guildID}`)
        
        return d.deflate()
    }
}