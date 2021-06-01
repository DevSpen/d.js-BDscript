const operators = require("../utils/operators")
const check = require("../utils/condition")

module.exports = {
    name: "$onlyIf",
    brackets: true,
    description: "checks whether a condition is met and returns an error if it is not",
    fields: [{
        name: "condition",
        type: "string",
        description: "the condition to evaluate"
    }, {
        name: "error",
        type: "string",
        description: "the code to execute when the condition is false"
    }],
    execute: async d => {
        const [condition, ...code] = d.value.splits 
        
        const flds = d.fieldsIn(code.join(";"))
        
        const operator = operators.find(a => condition.includes(a)) 
        
        if (!operator) return d.sendError(`:x: Invalid operator in \`$onlyIf\``)
        
        const values = condition.split(operator)
        
        let [value1, value2] = values 
        
        value1 = await d.resolveCode(value1)
        
        value2 = await d.resolveCode(value2)
        
        let pass = check(value1, operator, value2)
        
        if (!pass) {
            return d.deflate(d.value.id, "", flds, code.join(";")) 
        }
        
        return d.deflate(d.value.id, "")
    }
}