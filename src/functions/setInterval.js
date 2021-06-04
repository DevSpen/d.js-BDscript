const ms = require("ms")

module.exports = {
    name: "$setInterval",
    description: "executes given code every given time",
    fields: [{
        name: "time",
        type: "string",
        description: "the time to wait before executing the code inside"
    }, {
        name: "code",
        type: "string",
        description: "the code to execute every given time"
    }, {
        name: "returnIntervalID",
        type: "boolean",
        description: "whether to return interval ID (used to clear interval)"
    }],
    returns: "?number",
    brackets: true,
    execute: async d => {
        d = d.clone() 
        
        const [
            timeout,
            code,
            returnId = "no"
        ] = d.value.splits 
        
        const time = await d.resolveCode(timeout)

        if (timeout === undefined) return undefined 
        
        const returnID = await d.resolveCode(returnId)
        
        if (returnID === undefined) return undefined

        const id = Math.floor(Math.random() * 99999999999)
        
        d.client.bot.intervals.set(id.toString(), setInterval(() => {
            d.resolveCode(code)
        }, ms(timeout)))
        
        return d.deflate(returnID === "yes" ? id.toString() : "") 
    }
}