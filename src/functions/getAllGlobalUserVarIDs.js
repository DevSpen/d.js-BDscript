module.exports ={
    name: "$getAllGlobalUserVarIDs",
    brackets: true,
    description: "returns all the global user IDs that have at least one variable value assigned in the database",
    fields: [{
        name: "separator",
        type: "string",
        description: "the separator for each ID"
    }],
    returns: "?string",
    execute: async d => {
        const [
            separator = ", "
        ] = (await d.resolveArray()) || []
        
        if (separator === undefined) return 
        
        const data = await d.client.bot.db.all("main", {
            where: `type = 'user'`
        })
        
        return d.deflate(data.map(a => a.id).join(separator))
    }
}