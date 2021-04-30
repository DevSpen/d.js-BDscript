module.exports = {
    name: "$data",
    brackets: true,
    description: "pulls data from given assigned values from a function",
    fields: [{
        name: "property",
        description: "the property name holding the value",
        type: "string"
    }],
    returns: "?any",
    execute: async d => {
        const prop = await d.resolveAll()
        
        if (prop === undefined) return 
        
        const val = eval(`d.container.${d.container.pointTo || "data"}?.${prop}`) 
        
        if (val === undefined) return d.sendError(`:x: No data '${prop}' found!`)
        
        return d.deflate(val) 
    }
}