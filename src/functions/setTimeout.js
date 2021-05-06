const ms = require("ms")

module.exports = {
    name: "$setTimeout",
    description: "delays given code for given time",
    fields: [{
        name: "time",
        type: "string",
        description: "the time to wait before executing the code inside"
    }, {
        name: "code",
        type: "string",
        description: "the code to execute after given time"
    }],
    brackets: true,
    execute: async d => {
        d = d.clone() 
        
        const [
            timeout,
            ...code
        ] = d.value.splits 
        
        const time = await d.resolveCode(timeout)
        
        if (timeout === undefined) return 
        
        setTimeout(() => {
            d.resolveCode(code.join(";"))
        }, ms(timeout));
        
        return d.deflate() 
    }
}