module.exports = {
    name: "$resetMessageVar",
    brackets: true,
    execute: async d => {
        const [
            variable
        ] = (await d.resolveArray()) || []
        
        if (variable === undefined) return undefined
        
        const varData = d.client.bot.variables.find(c => c.name === variable)
        
        if (!varData) return d.sendError(`:x: Variable ${variable} does not exist`)
        
        const data = {}
        
        data[variable] = varData.defaultValue 
        
        await d.client.bot.db.updateWithQuery("main", data, {
            where: `type = 'message'`
        })
        
        return d.deflate() 
    }
}