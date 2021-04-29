module.exports ={
    name: "$getAllServerVarIDs",
    brackets: true,
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