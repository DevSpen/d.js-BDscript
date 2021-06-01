const DiscordUtil = require("../utils/discord")

module.exports = {
    name: "$updateChannelPerms",
    description: "updates a channel overwrites",
    brackets: true,
    fields: [{
        name: "channelID",
        type: "string",
        description: "the channel to update its overwrites"
    }, {
        name: "user/role",
        type: "string",
        description: "the user or role ID to give these overwrites to"
    }, {
        name: "permissions",
        type: "string",
        description: "permissions to allow (+), deny (-) or unmark (/), separated by `;`"
    }],
    execute: async d => {
        const [
            channelID,
            id,
            ...perms
        ] = (await d.resolveArray()) ?? []
        
        if (channelID === undefined) return undefined
        
        const channel = d.client.channels.cache.get(channelID)
        
        if (!channel) return d.sendError("channelID", channelID)
        
        const obj = {} 
        
        const permissions = DiscordUtil.getPerms(perms.map(p => p.slice(1)), true)
        
        if (permissions.includes(undefined)) return d.sendError(`:x: Invalid permission given in \`$updateChannelPerms\``)
        
        for (let i = 0;i < permissions.length;i++) {
            const curr = perms[i]
            const perm = permissions[i]
            const symbol = curr[0]
            if (!["/", "+", "-"].includes(symbol)) return d.sendError(`:x: Permission '${curr}' needs a symbol in \`$updateChannelPerms\``)
            else obj[perm] = symbol === "/" ? null : symbol === "+" ? true : false 
        }
        
        const ch = await channel.updateOverwrite(id, obj).catch(err => null)
        
        if (!ch) return d.sendError(`:x: Failed to update channel overwrites!`)
        
        return d.deflate()
    }
}