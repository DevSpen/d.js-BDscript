module.exports = {
    name: "$authorID",
    returns: "string",
    description: "returns the author's ID",
    execute: async d => {
        return d.deflate(d.value.id, d.message && d.message.author ? d.message.author.id || "" : "")
    }
}