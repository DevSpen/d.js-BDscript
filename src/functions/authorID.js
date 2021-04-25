module.exports = {
    name: "$authorID",
    execute: async d => {
        return d.deflate(d.value.id, d.message && d.message.author ? d.message.author.id || "" : "")
    }
}