const data = require("../main/data");
const Function = require("../structures/Function");

module.exports = new Function({
    name: "$setStatus",
    description: "set the bot status.",
    brackets: true,
    fields: [
        {
            name: "status",
            description: "the status text",
            type: "string"
        },
        {
            name: "type",
            description: "the status type, `PLAYING`, `STREAMING`..."
        },
        {
            name: "presence",
            description: "the presence status for the status",
            type: "string"
        },
        {
            name: "url",
            description: "the url the bot is streaming, if streaming presence is passed.",
            type: "string"
        },
        {
            name: "idle",
            type: "boolean",
            description: "whether the client is afk."
        }
    ],
    execute: async (d = data) => {
        const [
            status,
            type = "watching", 
            presence = "online",
            url,
            idle = "no"
        ] = (await d.resolveArray()) ?? []

        if (status === undefined) return undefined

        d.client.user.setPresence({
            afk: idle === "yes",
            status: presence,
            activities: [
                {
                    name: status,
                    url, 
                    type: type.toUpperCase(),
                }
            ]
        })

        return d.deflate()
    }
})