module.exports = {
    name: "$messageURL",
    returns: "?string",
    description: "The URL of the author’s message.",
    execute: async d => {
        return d.deflate(d.message?.url || "")
    }
}
