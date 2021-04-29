module.exports ={
    name: "$getAllUserVarIDs",
    brackets: true,
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