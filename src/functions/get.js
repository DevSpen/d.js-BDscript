module.exports = {
    name: "$get",
    description: "gets a temp variable value",
    fields: [{
        name: "variable",
        description: "the name of the variable",
        type: "string"
    }],
    returns: "?any", 
    brackets: true,
    execute: async d => {
        const variable = await d.resolveAll()
        
        if (variable === undefined) return 
        
        return d.deflate(d.container.keywords[variable])
    }
}