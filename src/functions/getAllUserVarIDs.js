module.exports ={
    name: "$getAllUserVarIDs",
    brackets: true,
    description: "returns all the server user IDs that have at least one variable value assigned in the database",
    fields: [{
        name: "guildID",
        type: "string",
        description: "the guild to get the IDs from"
    }, {
        name: "separator",
        type: "string",
        description: "the separator to separate each ID"
    }],
    returns: "?string",
    execute: async d => {
        const [
            guildID,
            separator = ", "
        ] = (await d.resolveArray()) || []
        
        if (guildID === undefined) return 
        
        const data = await d.client.bot.db.all("main", {
            where: `type = 'member' AND id LIKE '%_${guildID}'`
        })
        
        return d.deflate(data.map(a => a.id.split("_")[0]).join(separator))
    }
}