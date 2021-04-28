module.exports = {
    name: "$djsEval",
    brackets: true,
    execute: async d => {
        let code
        let output = false 
        
        const { client, args, container, message } = d 
        
        if (d.value.fields.length) {
            code = await d.resolveAll()
            
            if (!code) return undefined
            
            const fields = code.split(";")
            
            if (["yes", "no"].includes(fields[0])) output = fields.shift() === "yes"
            
            code = fields.join(";")
        } else {
            code = d.value.inside
            
            if (!code) return undefined
            
            const fields = code.split(";")
            
            if (["yes", "no"].includes(fields[0])) output = fields.shift() === "yes"
            
            code = fields.join(";")
        }
        
        try {
            var evaled = await eval(code)
        } catch (e) {
            evaled = e
        }
        
        if (typeof evaled === "object") evaled = require("util").inspect(evaled, { depth: 0 })
        
        return d.deflate(d.value.id, output ? evaled : "")
    }
}