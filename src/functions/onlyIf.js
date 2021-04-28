const operators = require("../utils/operators")
const condition = require("../utils/condition")

module.exports = {
    name: "$onlyIf",
    brackets: true,
    execute: async d => {
        const [condition, ...code] = d.value.splits 
        
        const flds = d.fieldsIn(code.join(";"))
        
        const operator = operators.find(a => condition.includes(a)) 
        
        if (!operator) return d.sendError(`:x: Invalid operator in \`$onlyIf\``)
        
        const values = condition.split(operator)
        
        let [value1, value2] = values 
        
        value1 = await d.resolveCode(value1)
        
        value2 = await d.resolveCode(value2)
        
        let pass = condition(value1, operator, value2)
        
        if (!pass) {
            return d.deflate(d.value.id, "", flds, code.join(";")) 
        }
        
        return d.deflate(d.value.id, "")
    }
}