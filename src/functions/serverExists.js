module.exports = {
    name: "$serverExists",
    brackets: true,
    execute: async d => {
        const guildID = await d.resolveAll()
        
        if (guildID === undefined) return undefined
        
        return d.deflate(d.client.guilds.cache.has(guildID))
    }
}