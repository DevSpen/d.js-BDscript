module.exports = {
    name: "$reactionAuthorID",
    description: "Returns the user that reacted/unreacted (for reaction callbacks).",
    returns: "?string",
    execute: async d => {
        return d.deflate(d.user?.id ?? "")
    }
}
