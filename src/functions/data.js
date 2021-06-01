module.exports = {
    name: "$data",
    brackets: true,
    description: "pulls data from given assigned values from a function",
    fields: [{
        name: "property",
        description: "the property name holding the value",
        type: "string"
    }, {
        name: "hideError",
        description: "whether or not to suppress the error if data does not exist",
        type: "boolean"
    }],
    returns: "?any",
    execute: async d => {
        const [prop, hideError = "no"] = (await d.resolveArray()) || []
        
        if (prop === undefined) return 
        
        const val = eval(`d.container.${d.container.pointTo || "data"}?.${prop}`) 
        
        if (val === undefined && hideError === "no") return d.sendError(`:x: No data '${prop}' found!`)
        
        return d.deflate(typeof val === "object" ? require("util").inspect(val) : val) 
    }
}