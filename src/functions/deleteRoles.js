module.exports = {
    name: "$deleteRoles",
    description: "delete a role or roles of a guild",
    brackets: true,
    fields: [{
        name: "guildID",
        type: "string",
        description: "the guild to delete the roles in"
    }, {
        name: "roles",
        type: "string",
        description: "the role or role IDs to delete, separated by `;`"
    }],
    execute: async d => {
        const [
            guildID,
            ...ids
        ] = (await d.resolveArray()) || []
        
        if (guildID === undefined) return undefined
        
        const guild = d.client.guilds.cache.get(guildID)
        
        if (!guild) return d.sendError("guildID", guildID)
        
        for (const id of ids) {
            const role = guild.roles.cache.get(id)
            
            if (!role) return d.sendError(`channelID`, id)
            
            const del = await role.delete().catch(err => null)
            
            if (!del) return d.sendError(`:x: Failed to delete role!`)
        }
        
        return d.deflate()
    }
}