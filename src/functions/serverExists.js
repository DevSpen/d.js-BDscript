module.exports = {
    name: "$serverExists",
    brackets: true,
    description: "check whether or not given guild ID exists",
    fields: [{
        name: "guildID",
        type: "string",
        description: "the guild to check for"
    }],
    returns: "boolean",
    execute: async d => {
        const guildID = await d.resolveAll()
        
        if (guildID === undefined) return undefined
        
        return d.deflate(d.client.guilds.cache.has(guildID))
    }
}