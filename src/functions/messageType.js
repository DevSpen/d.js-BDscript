module.exports = {
    name: "$messageType",
    description: "return message type",
    returns: "?string",
    execute: async d => {
        return d.deflate(d.message?.type.toTitle() ?? "")
    }
}