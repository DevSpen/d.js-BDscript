const fs = require("fs")

module.exports = () => {
    const fns = {}
    
    for (const file of fs.readdirSync(__dirname + "/../functions/")) {
        const fn = require(`../functions/${file}`)
        
        if (fn.disabled) {
            continue
        }
        
        fns[fn.name] = fn 
    }
    
    return fns 
}