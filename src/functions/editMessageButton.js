const data = require("../main/data")
const Function = require("../structures/Function")

module.exports = new Function({
    name: "$editMessageButton",
    description: "edit a message's button.",
    brackets: true,
    fields: [
        {
            name: "channelID",
            description: "the channel where the message was sent in",
            type: "string"
        },
        {
            name: "messageID",
            description: "the message to edit a button",
            type: "string"
        },
        {
            name: "button name | custom ID",
            description: "ID or name of the button",
            type: "string"
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
    execute: async (d = data) => {
        const [
            channelID,
            messageID,
            option, 
            customID,
            label,
            style,
            linkOrEmoji,
            disabled = "no"
        ] = (await d.resolveArray()) ?? []

        if (channelID === undefined) return undefined

        const channel = d.client.channels.cache.get(channelID)

        if (!channel) return d.sendError(`channel ID`, channelID)

        const m = await channel.messages.fetch(messageID).catch(() => null)

        if (!m) return d.sendError(`message ID`, messageID)

        const rows = m.components

        const row = m.components.find(c => c.components.map(c => c.customID === option || c.label === option))

        if (!row) return d.sendError(`button name | ID`, option)

        const button = row.components.find(c => c.label === option || c.customID === option)

        button 
        .setCustomID(customID || button.customID)
        .setStyle(style.toUpperCase() || button.style)
        .setDisabled(disabled === "yes")
        .setLabel(label || button.label)
        if (linkOrEmoji && (style === "LINK" || button.style === "LINK" )) {
            button.setURL(linkOrEmoji)
        } else if (linkOrEmoji) {
            button.setEmoji(linkOrEmoji)
        }

        const edit = await m.edit({
            components: rows,
        }).catch(err => err.message)

        if (typeof edit === "string") return d.sendError(`:x: Could not edit components! ${edit}`)

        return d.deflate()
    }
})