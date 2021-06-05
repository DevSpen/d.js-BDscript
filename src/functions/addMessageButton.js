const { MessageActionRow, MessageButton } = require("discord.js")
const { validate } = require("../utils/discord")

module.exports = {
    name: "$addMessageButton",
    description: "add a button to a message",
    brackets: true,
    fields: [
        {
            name: "channelID",
            description: "the channel where the message was sent in",
            type: "string"
        },
        {
            name: "messageID",
            description: "the message to add the button to",
            type: "string"
        },
        {
            name: "actionRowIndex",
            type: "number",
            descripton: "the row to add this button to"
        },
        {
            name: "custom ID",
            description: "the custom interaction ID assigned by a developer to difference a button from others.",
            type: "any"
        },
        {
            name: "label",
            description: "the text for this button",
            type: "string"
        },
        {
            name: "style",
            type: "string",
            description: "button style, can be primary, danger, link, secondary, success."
        },
        {
            name: "link | emoji",
            description: "the link for the button (if marked as link style) or emoji for normal button",
            type: "string"
        },
        {
            name: "disabled",
            type: "boolean",
            description: "whether this button should appear as disabled"
        },
    ],
    execute: async d => {
        const [
            channelID,
            messageID,
            actionRow,  
            customID,
            label,
            style,
            linkOrEmoji,
            disabled = "no"
        ] = (await d.resolveArray()) ?? []

        if (channelID === undefined) return undefined

        const channel = d.client.channels.cache.get(channelID)

        if (!channel) return d.sendError(`channel ID`, channelID)

        const m = validate(messageID) ? await channel.messages.fetch(messageID).catch(() => null) : null

        if (!m) return d.sendError(`message ID`, messageID)

        const actionRowIndex = Number(actionRow) - 1 || 0 
         
        const rows = m.components 

        if (!rows.length) {
            rows.push(new MessageActionRow())
        } 

        if (!rows[actionRowIndex]) {
            while (!rows[actionRowIndex]) {
                rows.push(new MessageActionRow())
            }
        }

        const button = new MessageButton()
        .setCustomID(customID)
        .setStyle(style.toUpperCase())
        .setDisabled(disabled === "yes")
        .setLabel(label)
        
        if (linkOrEmoji && button.style === "LINK") {
            button.setURL(linkOrEmoji)
        } else if (linkOrEmoji) {
            button.setEmoji(linkOrEmoji)
        }

        rows[actionRowIndex].addComponents(button)

        const verify = await m.edit(m.content, {
            components: rows
        }).catch(err => err.message)

        if (typeof verify === "string") return d.sendError(`:x: Failed to add button to message! (${verify})`)

        return d.deflate()
    }
}