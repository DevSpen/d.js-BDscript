const operators = require("../utils/operators")
const cond = require("../utils/condition")

module.exports = {
    name: "$if",
    description: "checks if given condition is true and executes a code, or executes a different code if false",
    fields: [{
        name: "condition",
        description: "the condition",
        type: "string"
    }, {
        name: "code",
        description: "the code to execute if the condition is true",
        type: "string"
    }, {
        name: "else",
        description: "the code to execute if the condition is false",
        type: "string"
    }],
    returns: "?string",
    brackets: true,
    execute: async d => {
        const [
            condition,
            ifCode,
            elseCode
        ] = d.value.splits 
       
        const operator = operators.find(op => condition.includes(op))
        
        if (!operator) return d.sendError(`:x: Invalid operator in \`$if\``)
        
        let [value1, value2] = condition.split(operator)
        
        value1 = await d.resolveCode(value1)
        
        if (value1 === undefined) return undefined
        
        value2 = await d.resolveCode(value2)
        
        if (value2 === undefined) return undefined 
        
        let pass = cond(value1, operator, value2) 
        
        if (pass && ifCode) {
            const c = await d.resolveCode(ifCode)
            
            if (c === undefined) return undefined
            
            return d.deflate(c) 
        } else if (!pass && elseCode) {
            const c = await d.resolveCode(elseCode)
            
            if (c === undefined) return undefined
            
            return d.deflate(c) 
        }
        
        return d.deflate() 
    }
}