module.exports = {
    name: "$interactionID",
    aliases: [
        "$customID"
    ],
    description: "the custom ID of this button",
    returns: "?any",
    execute: async d => {
        return d.deflate(d.data?.interaction?.customID ?? "")
    }
}