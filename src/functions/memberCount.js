module.exports = {
    name: "$memberCount",
    execute: async d => {
        return d.deflate(d.message?.guild?.memberCount)
    }
}
