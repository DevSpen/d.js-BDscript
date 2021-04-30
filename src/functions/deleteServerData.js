module.exports = {
    name: "$deleteServerData",
    description: "deletes all the variable values for given server",
    brackets: true,
    fields: [{
        name: "guildID",
        description: "the server to delete the data from",
        type: "string"
    }],
    brackets: true,
    execute: async d => {
        const [
            guildID = d.message?.guild?.id
        ] = (await d.resolveArray()) || []
        
        if (guildID === undefined) return undefined
        
        await d.client.bot.db.delete("main", guildID)
        
        return d.deflate()
    }
}