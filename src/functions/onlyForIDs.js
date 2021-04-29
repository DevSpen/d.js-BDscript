module.exports = {
    name: "$onlyForIDs",
    brackets: true,
    execute: async d => {
        const ids = d.value.splits 
        
        const error = ids.pop()
        
        for (let id of ids) {
            id = await d.resolveCode(id)
            
            if (id === undefined) return undefined
            
            if (id === d.message?.author?.id) {
                return d.deflate()
            }
        }
        
        return d.deflate(d.value.id, "", d.fieldsIn(error), error) 
    }
}