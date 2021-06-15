module.exports = {
    name: "$isSystemMessage",
    returns: "?boolean",
    description: "Whether or not this message was sent by Discord, not a actual user (e.g pin notifications).",
    execute: async d => {
        return d.deflate(d.message?.system ?? "")
    }
}
