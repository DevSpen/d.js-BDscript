const Discord = require("discord.js")

module.exports = async (reaction) => {
    if (reaction.count <= reaction.users.cache.size) return reaction.users.cache 
    
    const collection = new Discord.Collection()
    
    async function get(after) {
        const users = await reaction.users.fetch({ limit: 100, after })
        
        if (!users.size) return 
        
        users.map((u, key) => collection.set(key, u))
        
        await get(users.last().id)
    }
    
    await get()
    
    return collection 
}