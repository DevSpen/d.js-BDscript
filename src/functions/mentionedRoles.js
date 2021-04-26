module.exports = {
    name: "$mentionedRoles",
    brackets: true,
    execute: async d => {
        if (d.value.fields.length) {
            const [n] = (await d.resolveArray()) || []
            
            if (typeof n === "undefined") return undefined 
            
            const role = d.message.mentions ? d.message.mentions.roles.array()[Number(n) - 1] : undefined
            
            return d.deflate(d.value.id, role?.id || "")
        } else {
            const [n] = d.value.inside.split(";")
            
            const role = d.message.mentions ? d.message.mentions.roles.array()[Number(n) - 1] : undefined
            
            return d.deflate(d.value.id, role?.id || "")
        }
    }
}