const ms = require("ms")

module.exports = {
    name: "$deletecommand",
    brackets: true,
    optional: true,
    execute: async d => {
        if (d.value.inside) {
            const time = await d.resolveAll()
            
            if (!time) return undefined
            
            setTimeout(() => {
                d.message?.delete?.().catch(err => null)
            }, ms(time) || 0)
            
            return d.deflate()
        } else {
            await d.message?.delete?.().catch(err => null)
            
            return d.deflate() 
        }
    }
}