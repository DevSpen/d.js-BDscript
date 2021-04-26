const Discord = require("discord.js")

module.exports = (client, code) => {
    const functions = Object.keys(client.bot.parser).sort((x, y) => y.length - x.length) 
    
    const collection = new Discord.Collection() 
    
    let deniedIds = []
    
    let compiled = code.escape() 
    
    for (const after of code.split("$").slice(1).reverse()) {
        const regex = new RegExp(`(${functions.map(a => `\\${a}`).join("|")})`, "g")
        
        const fns = ("$" + after).match(regex) 
        
        if (!fns) {
            continue
        }
        
        const snowflake = Math.floor(Math.random() * 1000000000)
        
        const fn = client.bot.parser[fns[0]]
        
        const r = compiled.split(fn.name).length - 1 
        
        const afterFunc = compiled.split(fn.name)[r] 
        
        if (fn.brackets && !fn.optional && !afterFunc.includes("]")) throw new Error(`${afterFunc.slice(0,15)}...\n^^^^ Missing ] after argument list`)
        
        if (fn.brackets && afterFunc[0] === "[") {
            const inside = afterFunc.slice(1).split("]")[0]
            
            collection.set(snowflake, {
                id: snowflake,
                func: fn,
                splits: inside.split(";").map(a => a.unescape()),
                inside: inside.unescape(),
                total: `${fn.name}[${inside.unescape()}]`,
                fields: []
            })
            
            compiled = compiled.replaceLast(`${fn.name}[${inside}]`, client.bot.snowflake(snowflake)) 
        } else {
            collection.set(snowflake, {
                id: snowflake,
                func: fn,
                splits: [],
                total: fn.name, 
                fields: []
            })
            
            compiled = compiled.replaceLast(fn.name, client.bot.snowflake(snowflake))
        }
    }
    
    const compiledArray = []
    
    for (const val of collection.array().reverse()) {
        if (deniedIds.includes(val.id)) {
            if (typeof val.inside !== "undefined") {
                const fields = collection.array().filter(f => val.inside.includes(client.bot.snowflake(f.id))) 
            
                deniedIds = deniedIds.concat(fields.map(f => f.id))
                
                for (const field of fields) {
                    const col = collection.get(field.id)
                    col.belongsTo = val.id 
                    collection.set(field.id, col) 
                }
                
                val.fields = fields 
            }
            
            continue
        }
        
        if (typeof val.inside !== "undefined") {
            const fields = collection.array().filter(f => val.inside.includes(client.bot.snowflake(f.id))) 
            
            for (const field of fields) {
                deniedIds.push(field.id)
                const col = collection.get(field.id)
                col.belongsTo = val.id 
                collection.set(field.id, col) 
            }
            
            val.fields = fields 
            
            compiledArray.push(val) 
        } else {
            compiledArray.push(val) 
        }
    }
    
    return {
        deniedIds,
        data: compiledArray,
        code: compiled,
        old: code 
    }
}

String.prototype.replaceLast = function (what, replacement) {
    let pcs = this.split(what);
    let lastPc = pcs.pop();
    return pcs.join(what) + replacement + lastPc;
};