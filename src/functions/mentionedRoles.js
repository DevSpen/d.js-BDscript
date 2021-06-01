module.exports = {
    name: "$mentionedRoles",
    description: "returns mentioned role ID",
    returns: "?string",
    optional: true,
    fields: [{
        name: "mention number",
        type: "number",
        description: "the mentioned role's ID to return"
    }],
    brackets: true,
    execute: async d => {
        if (!d.value.inside) {
            return d.deflate(d.message?.mentions?.roles.map(r => r.id).join(", ") ?? "")
        }
        
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