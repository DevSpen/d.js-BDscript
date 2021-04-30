module.exports = {
    name: "$onlyForIDs",
    brackets: true,
    fields: [{
        name: "userIDs",
        type: "string",
        description: "The ID or IDs of each user that can use this command, separated by `;`"
    }, {
        name: "error",
        type: "string",
        description: "the code to execute when none of the IDs match the author ID"
    }],
    description: "restricts command usage to given IDs",
    execute: async d => {
        const ids = [...d.value.splits]
        
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