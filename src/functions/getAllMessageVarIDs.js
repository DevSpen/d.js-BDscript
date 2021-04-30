module.exports ={
    name: "$getAllMessageVarIDs",
    brackets: true,
    description: "returns all the message IDs that have at least one variable value assigned in the database",
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
            where: `type = 'message'`
        })
        
        return d.deflate(data.map(a => a.id).join(separator))
    }
}