module.exports = {
    name: "$deleteUserData",
    brackets: true,
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