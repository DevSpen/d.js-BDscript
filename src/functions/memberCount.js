module.exports = {
    name: "$memberCount",
    description: "returns the member count of a guild",
    brackets: true,
    fields: [{
        name: "guildID",
        type: "string",
        description: "the guild to get the member count from" 
    }, {
        name: "countBots",
        type: "boolean",
        description: "Whether to count bots of the guild."
    }, {
        name: "presence filter",
        description: "presence or presences to filter member count by, separated by `;` (dnd, online, idle, offline)"
    }],
    returns: "?number", 
    optional: true,
    execute: async d => {
        if (d.value.inside) {
            const [
                guildID,
                countBots = "yes",
                ...presences
            ] = (await d.resolveArray()) ?? []
            
            if (guildID === undefined) return undefined
            
            const guild = d.client.guilds.cache.get(guildID)
        
            if (!guild) return d.sendError("guildID", guildID)
            
            if (!presences.length && countBots === "yes") {
                return d.deflate(guild.memberCount)
            }

            const members = countBots === "no" ? guild.members.cache.filter(e => !e.user.bot) : guild.members.cache 

            return d.deflate(presences.length ? members.filter(m => presences.includes(m.presence.status)).size : members.size)
        } else {
            return d.deflate(d.message?.guild?.memberCount ?? "")
        }
    }
}
