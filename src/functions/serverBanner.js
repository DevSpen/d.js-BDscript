module.exports = {
    name: "$serverBanner",
    description: "Returns the server banner for a guild.",
    fields: [{
        name: "guildID",
        description: "The server to retrieve the banner from.",
        type: "string"
    }, {
        name: "size",
        description: "The size for the banner.",
        type: "number"
    }],
    returns: "?string",
    brackets: true,
    optional: true,
    execute: async d => {
        if (!d.value.inside) {
            return d.deflate(d.message?.guild?.bannerURL({
                size: 2048,
            }) ?? "")
        } 
        
        const [
            guildID,
            size = 2048,
        ] = (await d.resolveArray()) || []
        
        if (guildID === undefined) return
        
        const guild = d.client.guilds.cache.get(guildID)
        
        if (!guild) return d.sendError("guildID", guildID)
        
        return d.deflate(guild.bannerURL({
            size: Number(size) || 2048
        }) ?? "")
    }
}
