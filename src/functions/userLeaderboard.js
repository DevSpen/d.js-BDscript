module.exports = {
    name: "$userLeaderboard",
    brackets: true,
    execute: async d => {
        let [
            variable,
            sort = "asc",
            custom,
            separator = "\n",
            page = 1,
            limit = 10 
        ] = d.value.splits 
        
        variable = await d.resolveCode(variable)
        sort = await d.resolveCode(sort)
        separator = await d.resolveCode(separator)
        page = await d.resolveCode(page)
        limit = await d.resolveCode(limit)
      
        if (variable === undefined) return 
        if (sort === undefined) return 
        if (separator === undefined) return 
        if (limit === undefined) return 
        if (page === undefined) return 
        
        if (!custom) return d.sendError(":x: no leaderboard info specified!")
        
        const data = await d.client.bot.db.all("main", {
            where: `type = 'member' AND id like '%${d.message?.guild?.id}'`,
            sortType: sort.toUpperCase(),
            sort: variable, 
            limit: Number(limit),
            offset: Number(page) * Number(limit) - Number(limit) 
        })
        
        const content = []
        
        let top = page * Number(limit) - Number(limit) + 1 
        
        for (const val of data) {
            const id = val.id.split("_")[0]
            
            const user = await d.client.users.fetch(id) 
            
            d.container.pointTo = "userLb"
            
            d.container.userLb = {
                top,
                tag: user.tag,
                valueWithSeparator: val[variable].toLocaleString?.(),
                position: top,
                userID: id,
                mention: `<@${id}>`,
                value: val[variable],
                username: user.username
            }
            
            const text = await d.resolveCode(custom) 
            
            if (text === undefined) return undefined
            
            content.push(text) 
            
            top++ 
        }
        
        return d.deflate(content.join(separator))
    }
}