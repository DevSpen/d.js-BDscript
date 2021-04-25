Object.prototype.deflate = function (id, data) {
    return {
        id: this.client.bot.snowflake(id),
        with: data 
    }
}

Object.prototype.resolveAll = async function() {
    let text = this.value.inside 
    
    for (const val of this.value.fields) {
        this.value = val 
        const replacer = await val.func.execute(this, true)
        if (!replacer) return undefined
        text = text.replace(this.client.bot.snowflake(val.id), replacer.with)
    } 
    
    return text
}