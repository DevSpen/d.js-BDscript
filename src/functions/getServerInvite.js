const data = require("../main/data");

module.exports = {
    name: "$getServerInvite",
    description: "retrieves a invite link of a server",
    brackets: true,
    optional: true,
    returns: "?string",
    fields: [
        {
            name: "guildID",
            description: "the guild to get invite link from",
            type: "string"
        }
    ],
    execute: async (d = data) => {
        if (d.value.inside) {
            const guildID = await d.resolveAll()

            if (!guildID) return undefined

            const guild = d.client.guilds.cache.get(guildID)

            if (!guildID) return d.sendError(`guild ID`, guildID)

            const invite = await guild.systemChannel.createInvite().catch(() => nul)

            return d.deflate(invite?.url ?? "")
        } else {
            const invite = await d.message?.guild?.systemChannel.createInvite().catch(() => null)

            return d.deflate(invite?.url ?? "")
        }
    }
}