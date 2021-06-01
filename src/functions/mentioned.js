module.exports = {
    name: "$mentioned",
    brackets: true,
    description: "returns mentioned user ID",
    optional: true,
    returns: "?string",
    fields: [{
        name: "mention number",
        type: "number",
        description: "the mentioned user's ID to return"
    }, {
        name: "displayAuthorID",
        type: "boolean",
        description: "whether to return the author ID if no mention was found"
    }],
    execute: async d => {
        if (!d.value.inside) {
            return d.deflate(d.message?.mentions?.users.map(r => r.id).join(", ") ?? "")
        }
        
        if (d.value.fields.length) {
            const [n, displayAuthorID = "no"] = (await d.resolveArray()) || []
            
            if (typeof n === "undefined") return undefined 
            
            const user = d.message.mentions ? d.message.mentions.users.array()[Number(n) - 1] : undefined
            
            return d.deflate(d.value.id, user ? user.id : displayAuthorID === "yes" && d.message.author ? d.message.author.id || "" : "")
        } else {
            const [n, displayAuthorID = "no"] = d.value.inside.split(";")
            
            const user = d.message.mentions ? d.message.mentions.users.array()[Number(n) - 1] : undefined
            
            return d.deflate(d.value.id, user ? user.id : displayAuthorID === "yes" && d.message.author ? d.message.author.id || "" : "")
        }
    }
}