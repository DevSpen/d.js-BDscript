module.exports = {
    name: "$serverFeatures",
    description: "returns server features",
    returns: "?string",
    brackets: true,
    optional: true,
    fields: [{
        name: "guildID",
        type: "string",
        description: "the guild to get features from"
    }, {
        name: "separator",
        description: "the separator for each feature",
        type: "string"
    }],
    execute: async d => {
        if (!d.value.inside) {
            return d.deflate(d.message?.guild?.features.goof().join(", ") ?? "")
        }
        
        const [
            guildID,
            separator = ", "
        ] = (await d.resolveArray()) ?? []
        
        if (guildID === undefined) return undefined
        
        const guild = d.client.guilds.cache.get(guildID)
        
        if (!guild) return d.sendError("guildID", guildID)
        
        return d.deflate(guild.features?.goof().join(separator) ?? "")
    }
}