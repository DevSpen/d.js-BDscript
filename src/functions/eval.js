module.exports = {
    name: "$eval",
    brackets: true,
    description: "evals a d.js-bdscript code",
    returns: "?string",
    fields: [{
        name: "output",
        type: "boolean|message",
        description: "whether to return the output or eat it or send it in a new message"
    }, {
        name: "code",
        type: "string",
        description: "the code to eval", 
    }],
    execute: async d => {
        const array = await d.resolveArray() 
        if (!array) return undefined
        
        const showOutput = ["yes", "no", "message"].includes(array[0]) ? array.shift() : "no"
        
        const code = array.join(";")
        
        try {
            var compiled = d.client.bot.compile(d.client, code)
        } catch(err) {
            return d.sendError(err.message)
        }
        
        let newData = d.clone("command", {compiled}) 
        
        const data = await d.client.bot.interpreter(newData, showOutput === "message" ? false : true)
        
        if (showOutput === "message") {
            return d.deflate(d.value.id, "")
        }
        
        if (!data) return undefined
        
        return d.deflate(d.value.id, showOutput === "yes" ? data.code : "")
    }
}