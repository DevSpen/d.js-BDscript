module.exports = {
    name: "$parseTime",
    description: "parses given ms into readable time duration",
    returns: "?string",
    fields: [{
        name: "ms",
        type: "number",
        description: "the milliseconds to parse"
    }],
    brackets:true,
    execute: async d => {
        const n = await d.resolveAll()
        
        if (n === undefined) return undefined
        
        try {
            var time = d.client.bot.parse(Number(n))
            
            if (!time) throw new Error("NaN")
        } catch (e) {
            return d.sendError(`:x: Failed to parse ${n}!`)
        }
        
        return d.deflate(time)
    }
}