module.exports = {
    name: "$serverIcon",
    description: "Returns the server icon for a guild",
    fields: [{
        name: "guildID",
        description: "guild to retrieve the icon from",
        type: "string"
    }, {
        name: "size",
        description: "the size for the icon",
        type: "number"
    }, {
        name: "dynamic",
        description: "whether the icon should be animated if its a gif",
        type: "boolean"
    }],
    returns: "?string",
    brackets: true,
    optional: true,
    execute: async d => {
        if (!d.value.inside) {
            return d.deflate(d.message?.guild?.iconURL({
                size: 2048,
                dynamic: true
            }) ?? "")
        } 
        
        const [
            guildID,
            size = 2048,
            dynamic = "yes"
        ] = (await d.resolveArray()) || []
        
        if (guildID === undefined) return
        
        const guild = d.client.guilds.cache.get(guildID)
        
        if (!guild) return d.sendError("guildID", guildID)
        
        return d.deflate(guild.iconURL({
            dynamic: dynamic === "yes",
            size: Number(size) || 2048
        }) ?? "")
    }
}