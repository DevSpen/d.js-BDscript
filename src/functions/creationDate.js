module.exports = {
    name: "$creationDate",
    description: "returns creation date (in ms) of given role, user, guild, emoji (...) ID.",
    brackets: true,
    fields: [
        {
            name: "id",
            description: "the guild, emoji, user (...) ID."
        },
    ],
    returns: "number",
    execute: async d => {
        const id = await d.resolveAll()

        if (id === undefined) return undefined

        let type; 

        if (!type) {
            type = d.client.guilds.cache.get(id)
        }
        
        if (!type) {
            type = d.client.emojis.cache.get(id)
        } 

        if (!type) {
            type = d.message?.guild?.roles.cache.get(id)
        } 

        if (!type) {
            type = d.client.channels.cache.get(id)
        }

        if (!type) {
            type = await d.client.users.fetch(id).catch(() => null)
        }

        if (!type) {
            return d.sendError(`ID`, id)
        }

        return d.deflate(type.createdTimestamp)
    }
}