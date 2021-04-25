Object.prototype.deflate = function (id, data, stop = false, code) {
    return {
        id: this.client.bot.snowflake(id),
        with: data,
        stop,
        code 
    }
}

Object.prototype.resolveArray = async function() {
    const array = []
    
    for (const code of this.value.inside.split(";")) {
        const data = await this.resolveCode(code)
        
        if (typeof code === "undefined") return undefined 
        else array.push(data) 
    }
    
    return array 
}

Object.prototype.fieldsIn = function (code) {
    return this.value.fields.filter(f => code.includes(this.client.bot.snowflake(f.id)))
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

Object.prototype.sendError = function (error) {
    try {
        this.mainChannel.send(error) 
    } catch (e) {
        console.log(error)
    }
    
    return undefined 
}

Object.prototype.resolveCode = async function(code) {
    const fields = this.fieldsIn(code) 
    return await this.resolveFields(fields, code)
}

Object.prototype.resolveFields = async function(fields, code) {
    let text = code || this.value.inside 
    
    for (const val of fields) {
        let data = Object.assign(Object.create(this), this)
        data.value = val 
        const replacer = await val.func.execute(data, true)
        if (!replacer) return undefined
        text = text.replace(this.client.bot.snowflake(val.id), replacer.with)
    } 
    
    return text
}