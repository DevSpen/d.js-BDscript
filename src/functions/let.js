module.exports = {
    name: "$let",
        description: "sets a temp variable value",
    fields: [{
        name: "variable",
        description: "the name of the variable",
        type: "string"
    }, {
        name: "value",
        description: "the value for the temp variable",
        type: "any"
    }],
    brackets: true,
    execute: async d => {
        const [
            variable,
            value
        ] = (await d.resolveArray()) || []
        
        if (variable === undefined) return undefined
        
        d.container.keywords[variable] = value 
        
        return d.deflate()
    }
}