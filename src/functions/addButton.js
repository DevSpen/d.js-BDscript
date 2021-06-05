const { MessageButton } = require("discord.js")

module.exports = {
    name: "$addButton",
    description: "adds a button to an action row",
    brackets: true,
    fields: [
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
            customID,
            label,
            style,
            linkOrEmoji,
            disabled = "no"
        ] = (await d.resolveArray()) ?? []

        if (customID === undefined) return undefined

        const row = d.container.components[d.container.components.length - 1]

        if (!row) return d.sendError(`:x: No action row was yet created for buttons!`)

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

        row.addComponents(
            button 
        )

        return d.deflate()
    }
}