module.exports = (value1, operator, value2) => {
    let pass = false
        
    if (!["!=", "=="].includes(operator)) {
        value1 = Number(value1)
        value2 = Number(value2)
            
        if (isNaN(value1) || isNaN(value2)) return false 
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
        
    return pass 
}