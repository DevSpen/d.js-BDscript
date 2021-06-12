const data = require("../main/data");
const Function = require("../structures/Function");

module.exports = new Function({
    name: "$serverPruneCount",
    brackets: true, 
    description: "return amount of members that will be kicked after pruning",
    fields: [
        {
            name: "guildID",
            description: "the guild to get prune count from",
            type: "string"
        },
        {
            name: "days",
            description: "amount of days of inactivity",
            type: "number"
        },
        {
            name: "roles",
            description: "the roles to ignore members of, separated by `;`.",
            type: "string"
        }
    ],
    returns: "?number",
    execute: async (d = data) => {
        const [
            guildID,
            days = 7,
            ...roles 
        ] = (await d.resolveArray()) ?? []

        if (guildID === undefined) return undefined

        const guild = d.client.guilds.cache.get(guildID)

        if (!guild) return d.sendError(`guild ID`, guildID)

        const amount = await guild.members.prune({
            days: Number(days) || 7,
            roles: roles.length ? roles : undefined,
            dry: true  
        }).catch(err => err.message)

        if (typeof amount === "string") return d.sendError(`:x: Failed to get prune count! (${amount})`)

        return d.deflate(amount)
    }
})