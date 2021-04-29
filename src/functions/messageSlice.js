module.exports = {
    name: "$messageSlice",
    brackets: true,
    execute: async d => {
        const [
            x, y 
        ] = (await d.resolveArray()) || []
        
        if (x === undefined) return undefined
        
        return d.deflate(y ? d.args?.slice(Number(x), Number(y)).join(" ") || "" : d.args?.slice(Number(x)).join(" ") || "")
    }
}