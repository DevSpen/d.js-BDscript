const inviteProperties = require("../utils/invite-properties")

module.exports = {
    name: "$getInviteInfo",
    description: "get info on given invite code",
    returns: "?any",
    brackets: true,
    optional: false,
    fields: [
        {
            name: "code",
            description: "the invite code",
            type: "string"
        },
        {
            name: "data",
            description: "the info to get from the invite, check `/invite-properties` for all valid properties.",
            type: "string"
        }
    ],
    execute: async d => {
        const [
            code,
            prop 
        ] = (await d.resolveArray()) ?? []

        if (code === undefined) return undefined

        let inv = d.container.invites[code] ?? await d.client.fetchInvite(code).catch(() => null)

        if (!inv) return d.sendError("invite code", code)

        if (!d.container.invites[code] && d.client.guilds.cache.has(inv.guild.id)) {
            const invites = await d.client.guilds.cache.get(inv.guild.id).fetchInvites().catch(() => null)

            if (invites && invites.has(code)) {
                inv = invites.get(code)
            }
        }

        d.container.invites[code] = inv 
        
        if (!Object.keys(inviteProperties).includes(prop)) return d.sendError("property", prop)

        return d.deflate(eval(`inv${inviteProperties[prop]}`) ?? "")
    }
}