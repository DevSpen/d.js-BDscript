module.exports = {
    name: "$messageSlice",
    brackets: true,
    description: "returns arguments between given positions",
    returns: "?string",
    fields: [{
        name: "start",
        description: "the position to start at",
        type: "number"
    }, {
        name: "end",
        description: "the position to end",
        type: "number"
    }],
    execute: async d => {
        const [
            x, y 
        ] = (await d.resolveArray()) || []
        
        if (x === undefined) return undefined
        
        return d.deflate(y ? d.args?.slice(Number(x), Number(y)).join(" ") || "" : d.args?.slice(Number(x)).join(" ") || "")
    }
}