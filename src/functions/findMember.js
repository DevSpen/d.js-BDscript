const Function = require("../structures/Function");
const { USER, USER_ID } = require("../utils/regexes");

module.exports = new Function({
    name: "$findMember",
    description: "Find a member of a guild and return it's ID.",
    returns: "?string",
    brackets: true,
    fields: [
        {
            name: "guildID",
            description: "the guild to get the member from",
            type: "string"
        },
        {
            name: "username | userID | nickname | mention",
            description: "the user to find",
            type: "string"
        },
        {
            name: "returnAuthorID",
            description: "whether to return the author ID if no member was found",
            type: "boolean"
        }
    ],
    execute: async d => {
        const [
            guildID,
            user,
            returnAuthorID = "yes"
        ] = (await d.resolveArray()) ?? []

        if (guildID === undefined) return undefined

        const guild = d.client.guilds.cache.get(guildID)

        if (!guild) return d.sendError(`guild ID`, guildID)

        const members = await guild.members.fetch(USER.test(user) || USER_ID.test(user) ? {
            user: [user.replace(/[!><@]/g, "")],
        } : {
            query: user,
            limit: 1 
        }).catch(() => null)

        return d.deflate(members?.first()?.id ?? returnAuthorID === "yes" ? d.message?.author.id ?? "" : "")
    }
})