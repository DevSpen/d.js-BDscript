module.exports = {
    name: "$messageID",
    returns: "?string",
    description: "the ID of the message",
    execute: async d => {
        return d.deflate(d.message?.id || "")
    }
}