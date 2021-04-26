const operators = require("../utils/operators")

module.exports = {
    name: "$onlyIf",
    brackets: true,
    execute: async d => {
        const [condition, ...code] = d.value.splits 
        
        const flds = d.fieldsIn(code.join(";"))
        
        const operator = operators.find(a => condition.includes(a)) 
        
        if (!operator) return d.sendError(`:x: Invalid operator in \`$onlyIf\``)
        
        let pass = false
        
        const values = condition.split(operator)
        
        let [value1, value2] = values 
        
        value1 = await d.resolveCode(value1)
        
        value2 = await d.resolveCode(value2)
        
        if (!["!=", "=="].includes(operator)) {
            value1 = Number(value1)
            value2 = Number(value2)
            
            if (isNaN(value1) || isNaN(value2)) return d.sendError(`:x: Invalid number in \`$onlyIf\``)
        }
        
        if (operator === "==") {
            if (value1 === value2) pass = true
        } else if (operator === "!=") {
            if (value1 !== value2) pass = true
        } else if (operator === "<") {
            if (value1 < value2) pass = true
        } else if (operator === "<=") {
            if (value1 <= value2) pass = true 
        } else if (operator === ">") {
            if (value1 > value2) pass = true
        } else if (operator === ">=") {
            if (value1 >= value2) pass = true
        }
        
        if (!pass) {
            return d.deflate(d.value.id, "", flds, code.join(";")) 
        }
        
        return d.deflate(d.value.id, "")
    }
}