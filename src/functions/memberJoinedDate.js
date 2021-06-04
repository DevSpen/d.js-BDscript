module.exports = {
    name: "$memberJoinedDate",
    aliases: [
        "$memberJoinDate"
    ],
    description: "the member join date in ms",
    optional: true,
    brackets: true,
    fields: [
        {
            name: "guildID",
            type: "string",
            description: "the guild to get the join date of the member from"
        },
        {
            name: "userID",
            description: "the user to get its join date",
            type: "string"
        }
    ],
    returns: "?number",
    execute: async d => {
        if (d.value.inside) {
            const [
                guildID,
                userID
            ] = (await d.resolveArray()) || []
            
            if (guildID === undefined) return undefined 
            
            const guild = d.client.guilds.cache.get(guildID)
            
            if (!guild) return d.sendError(`:x: Invalid guild ID in \`${d.value.func.name}\``)
            
            const member = await guild.members.fetch(userID).catch(err => null)
            
            if (!member) return d.sendError(`:x: Invalid user ID in \`${d.value.func.name}\``)

            return d.deflate(member.joinedTimestamp)
        } else {
            return d.deflate(d.message?.member?.joinedTimestamp ?? "")
        }
    }
}