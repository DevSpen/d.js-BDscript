module.exports = {
    name: "$serverChannels",
    brackets: true,
    optional: true,
    description: "returns all the channels for this guild",
    returns: "?string",
    fields: [{
        name: "guildID",
        type: "string",
        description: "the guild to list channels from"
    }, {
        name: "option",
        type: "string",
        description: "the property to return for each channel, can be `name`, `mention`, `id`, etc..."
    }, {
        name: "separator",
        type: "string",
        description: "the separator for each channel"
    }, {
        name: "filters",
        type: "string",
        description: "filter server channels by given channel types, separated by `;`"
    }],
    execute: async d => {
        if (d.value.inside) {
            const [
                guildID,
                option = "name",
                separator = ", ",
                ...filters
            ] = (await d.resolveArray()) || []
            
            if (guildID === undefined) return undefined
            
            const guild = d.client.guilds.cache.get(guildID)
            
            if (!guild) return d.sendError("guildID", guildID)
        
            const channels = guild.channels.cache.filter(a => filters.length ? filters.includes(a.type) : true)
            
            return d.deflate(option === "count" ? channels.size : channels.map(ch => option === "mention" ? ch.toString() : ch[option] ?? "").join(separator))
        } else {
            return d.deflate(d.message?.guild?.channels.cache.map(ch => ch.name).join(", "))
        }
    }
}