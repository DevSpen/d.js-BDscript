module.exports.deflate = function (d, id, data, stop = false, code) {
    if (data === undefined) {
        return {
            id: d.client.bot.snowflake(d.value.id),
            with: id ?? ""
        }
    }
    
    return {
        id: d.client.bot.snowflake(id),
        with: data,
        stop,
        code 
    }
}

module.exports.resolveArray = async function(d) {
    const array = []
    for (const code of d.value.splits) {
        const data = await d.resolveCode(code)
        if (typeof code === "undefined") return undefined 
        else array.push(data) 
    }

    d.value = d.backup

    return array 
}

module.exports.fieldsIn = function (d, code) {
    code = String(code)
    return d.value.fields.filter(f => code.includes(d.client.bot.snowflake(f.id)))
}

module.exports.clone = function(d, name, obj) {
    const object = {}
    
    for (const [key, val] of Object.entries(d)) {
        if (name === key) object[key] = obj 
        else object[key] = val 
    }
    
    return object 
}


module.exports.resolveField = async function(d, index) {
    let text = d.value.inside 
    
    const field = d.value.fields[index]
    
    let data = d
    const val = d.value.fields[index]
    data.value = val 
    const replacer = await val.func.execute(data, true)
    if (!replacer) return undefined
    text = text.replace(d.client.bot.snowflake(val.id), replacer.with)
    
    d.value = d.backup

    return text
}

module.exports.resolveAll = async function(d) {
    let text = d.value.inside 
    
    for (const val of d.value.fields) {
        let data = d
        data.value = val 
        const replacer = await val.func.execute(data, true)
        if (!replacer) return undefined
        text = text.replace(d.client.bot.snowflake(val.id), replacer.with)
    } 

    d.value = d.backup

    return text
}

module.exports.sendError = function (d, ...error) {
    try {
        if (error.length === 1) d.mainChannel.send(error[0])
        else d.mainChannel.send(`:x: Invalid ${error[0]} '${error[1]}' in \`${d.value.func.name}\``)
    } catch (e) {
        console.log(error)
    }
    
    return undefined 
}

module.exports.resolveCode = async function(d, code) {
    const fields = d.fieldsIn(code)
    if (!fields.length) return code
    return await d.resolveFields(fields, code)
}

module.exports.resolveFields = async function(d, fields, code) {
    let text = code ?? d.value.inside 
    
    for (const val of fields) {
        let data = d
        data.value = val 
        const replacer = await val.func.execute(data, true)
        if (!replacer) return undefined
        text = text.replace(d.client.bot.snowflake(val.id), replacer.with)
    } 

    d.value = d.backup
    
    return text
}