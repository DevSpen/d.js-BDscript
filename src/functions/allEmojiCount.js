module.exports = {
    name: "$allEmojiCount",
    description: "returns emoji count of every guild",
    returns: "number",
    execute: async d => {
        return d.deflate(d.client.emojis.cache.size)
    }
}