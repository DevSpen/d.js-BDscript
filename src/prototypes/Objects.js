Object.prototype.deflate = function (id, data, stop = false, code) {
    if (data === undefined) {
        return {
            id: this.client.bot.snowflake(this.value.id),
            with: id ?? ""
        }
    }
    
    return {
        id: this.client.bot.snowflake(id),
        with: data,
        stop,
        code 
    }
}

Object.prototype.resolveArray = async function() {
    const array = []
    
    for (const code of this.value.splits) {
        const data = await this.resolveCode(code)
        
        if (typeof code === "undefined") return undefined 
        else array.push(data) 
    }
    
    return array 
}

Object.prototype.fieldsIn = function (code) {
    code = String(code)
    return this.value.fields.filter(f => code.includes(this.client.bot.snowflake(f.id)))
}

Object.prototype.clone = function(name, obj) {
    const object = {}
    
    for (const [key, val] of Object.entries(this)) {
        if (name === key) object[key] = obj 
        else object[key] = val 
    }
    
    return object 
}


Object.prototype.resolveField = async function(index) {
    let text = this.value.inside 
    
    const field = this.value.fields[index]
    
    let data = Object.assign(Object.create(this), this)
    const val = this.value.fields[index]
    data.value = val 
    const replacer = await val.func.execute(data, true)
    if (!replacer) return undefined
    text = text.replace(this.client.bot.snowflake(val.id), replacer.with)
    
    return text
}

Object.prototype.resolveAll = async function() {
    let text = this.value.inside 
    
    for (const val of this.value.fields) {
        let data = Object.assign(Object.create(this), this)
        data.value = val 
        const replacer = await val.func.execute(data, true)
        if (!replacer) return undefined
        text = text.replace(this.client.bot.snowflake(val.id), replacer.with)
    } 
    
    return text
}

Object.prototype.sendError = function (...error) {
    try {
        if (error.length === 1) this.mainChannel.send(error[0])
        else this.mainChannel.send(`:x: Invalid ${error[0]} '${error[1]}' in \`${this.value.func.name}\``)
    } catch (e) {
        console.log(error)
    }
    
    return undefined 
}

Object.prototype.resolveCode = async function(code) {
    const fields = this.fieldsIn(code)
    if (!fields.length) return code 
    return await this.resolveFields(fields, code)
}

Object.prototype.resolveFields = async function(fields, code) {
    let text = code ?? this.value.inside 
    
    for (const val of fields) {
        let data = Object.assign(Object.create(this), this)
        data.value = val 
        const replacer = await val.func.execute(data, true)
        if (!replacer) return undefined
        text = text.replace(this.client.bot.snowflake(val.id), replacer.with)
    } 
    
    return text
}