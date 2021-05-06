module.exports = {
    name: "$reactionEmoji",
    description: "returns the emoji used to react/unreact (reaction callbacks)",
    returns: "?string",
    execute: async d => {
        return d.deflate(d.reaction?.emoji.toString() ?? "")
    }
}