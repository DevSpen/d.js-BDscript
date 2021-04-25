const Util = require("../utils/discord")

module.exports = {
    name: "$userPerms",
    brackets: true,
    optional: true,
    execute: async d => {
        if (d.value.inside) {
            const [
                guildID,
                userID,
                override = "no"
            ] = (await d.resolveArray()) || []
            
            const guild = d.client.guilds.cache.get(guildID)
            
            if (!guild) return d.sendError("guildID", guildID)
            
            const member = await guild.members.fetch(userID).catch(err => null)
          
            if (!member) return d.sendError("userID", userID)
            
            const perms = Util.Permissions(member.permissions)
            
            return d.deflate(d.value.id, override === "yes" && perms.has("ADMINISTRATOR") ? "Administrator" : perms.readable.join(", "))
        } else {
            const perms = d.message.member ? Util.Permissions(d.message.member.permissions) : undefined
            
            return d.deflate(d.value.id, perms ? perms.readable.join(", ") || "" : "")
        }
    }
}