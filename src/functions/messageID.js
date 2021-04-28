module.exports = {
    name: "$messageID",
    execute: async d => {
        return d.deflate(d.message?.id || "")
    }
}