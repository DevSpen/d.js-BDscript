module.exports = {
    name: "$mentioned",
    brackets: true,
    execute: async d => {
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