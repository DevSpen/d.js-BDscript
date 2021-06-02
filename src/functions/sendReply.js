module.exports = {
    name: "$sendReply",
    description: "sends a inline reply to given message ID.",
    brackets: true,
    fields: [
        {
            name: "messageID",
            type: "string",
            description: "the message to reply to"
        }, 
        {
            name: "message",
            type: "string",
            description: "the content for this reply"
        },
        {
            name: "returnMessageID",
            type: "boolean",
            description: "whether to return the newly sent message ID"
        },
        {
            name: "disableMention",
            type: "boolean",
            description: "Whether to disable the user mention"
        }
    ],
    returns: "?string",
    execute: async d => {
        const [
            messageID,
            msg,
            returnID = "no",
            disableMention = "no"
        ] = (await d.resolveArray()) ?? []

        const exists = await d.message?.channel?.messages.fetch(messageID).catch(() => null)

        if (!exists) return d.sendError(`message ID`, messageID)

        d.container.replyMention = disableMention === "no"

        const m = await d.client.bot.resolveAPIMessage(exists, d.container, msg, "reply")

        return d.deflate(returnID === "yes" && m ? m.id : "")
    }
}