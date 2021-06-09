const data = require("../main/data")

module.exports = {
    name: "$botOwnerID",
    description: "returns the ID of the bot application owners",
    returns: "string",
    brackets: true,
    optional: true,
    fields: [{
        name: "separator",
        description: "the separator for each ID",
        type: "string"
    }],
    execute: async (d = data) => {
        if (!d.value.inside) {
            const app = await d.client.application.fetch()
            
            const owners = app.owner.tag ? [app.owner.id] : app.owner.map(m => m.id)
            
            return d.deflate(owners.join(", "))
        }
        
        const sep = await d.resolveAll()
        
        if (sep === undefined) return 
        
        const app = await d.client.application.fetch()
            
        const owners = app.owner.tag ? [app.owner.id] : app.owner.map(m => m.id)
            
        return d.deflate(owners.join(sep))
    }
}