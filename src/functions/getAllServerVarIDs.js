module.exports ={
    name: "$getAllServerVarIDs",
    brackets: true,
    description: "returns all the server IDs that have at least one variable value assigned in the database",
    fields: [{
        name: "separator",
        type: "string",
        value: "the separator to separate each ID"
    }],
    returns: "?string",
    execute: async d => {
        const [
            separator = ", "
        ] = (await d.resolveArray()) || []
        
        if (separator === undefined) return 
        
        const data = await d.client.bot.db.all("main", {
            where: `type = 'guild'`
        })
        
        return d.deflate(data.map(a => a.id).join(separator))
    }
}