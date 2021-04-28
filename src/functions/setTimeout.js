const ms = require("ms")

module.exports = {
    name: "$setTimeout",
    brackets: true,
    execute: async d => {
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