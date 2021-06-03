const { USER_ID, USER } = require("../utils/regexes")

module.exports = {
    name: "$queryMember",
    description: "returns first user ID match for given query, ID or mention.",
    brackets: true,
    fields: [
        {
            name: "guildID",
            description: "the guild to execute the query on",
            type: "string"
        },
        {
            name: "query",
            description: "query, id or mention",
            type: "string"
        }
    ],
    returns: "?string",
    execute: async d => {
        const [
            guildID,
            query 
        ] = (await d.resolveArray()) ?? []

        if (guildID === undefined) return undefined

        const guild = d.client.guilds.cache.get(guildID)

        if (!guild) return d.sendError(`guild ID`, guildID)

        let member; 

        if (USER.test(query) || USER_ID.test(query)) {
            member = await guild.members.fetch(query.replace(/[@<>!]/g, "")).catch(() => null)
        }

        if (!member && !USER.test(query) && !USER_ID.test(query)) {
            const members = await guild.members.fetch({
                query
            }).catch(() => null)

            member = members?.first()
        }

        return d.deflate(member?.id)
    }
}