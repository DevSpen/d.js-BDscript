const operators = require("../utils/operators")
const cond = require("../utils/condition")

module.exports = {
    name: "$checkCondition",
    brackets: true,
    description: "checks whether given condition is false or true",
    returns: "boolean",
    fields: [{
        name: "condition",
        type: "string",
        description: "the condition to check"
    }],
    execute: async d => {
        const condition = d.value.splits[0]
        
        const operator = operators.find(op => condition.includes(op))
        
        if (!operator) {
            let [value1, value2] = condition.split(operator)
        
            value1 = await d.resolveCode(value1)
            
            if (value1 === undefined) return undefined

            const bool = cond(value1)

            if (bool === undefined) return d.sendError(`:x: Invalid operator in \`$checkCondition\``)
            else return d.deflate(bool)
        }
        
        let [value1, value2] = condition.split(operator)
        
        value1 = await d.resolveCode(value1)
        
        if (value1 === undefined) return undefined
        
        value2 = await d.resolveCode(value2)
        
        if (value2 === undefined) return undefined 
        
        return d.deflate(cond(value1, operator, value2))
    }
}