module.exports = {
    name: "$resetServerVar",
    brackets: true,
    fields: [{
        name: "variable",
        type: "string",
        description: "the variable to reset"
    }],
    description: "reset a server variable value",
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
            where: `type = 'guild'`
        })
        
        return d.deflate() 
    }
}