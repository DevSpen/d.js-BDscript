module.exports = {
    name: "$userRoles",
    brackets: true,
    optional: true,
    execute: async d => {
        if (d.value.inside) {
            const [
                guildID,
                userID,
                option = "name",
                separator = ", ",
                sort = "no"
            ] = (await d.resolveArray()) || []
            
            if (guildID === undefined) return undefined 
            
            const guild = d.client.guilds.cache.get(guildID)
            
            if (!guild) return d.sendError(`:x: Invalid guildID in \`${d.value.func.name}\``)
            
            const member = await guild.members.fetch(userID).catch(err => null)
            
            if (!member) return d.sendError(`:x: Invalid userID in \`${d.value.func.name}\``)
            
            const roles = member.roles.cache.filter(r => r.id !== d.message.guild.id).sort((x, y) => sort === "yes" ? y.position - x.position : true).map(r => option === "mention" ? r.toString() : r[option] || "").join(separator)
            
            return d.deflate(d.value.id, roles)
        } else {
            const roles = d.message.member ? d.message.member.roles.cache.filter(r => r.id !== d.message.guild.id).map(r => r.name) : []
            
            return d.deflate(d.value.id, roles.join(", "))
        }
    }
}