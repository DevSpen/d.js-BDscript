module.exports = {
    name: "$reactionAuthorID",
    description: "returns the user that reacted/unreactes (reaction callbacks)",
    returns: "?string",
    execute: async d => {
        return d.deflate(d.user?.id ?? "")
    }
}