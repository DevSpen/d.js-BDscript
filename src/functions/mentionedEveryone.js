module.exports = {
    name: "$mentionedEveryone",
    description: "whether this message mentions everyone / here",
    returns: "boolean",
    execute: async d => {
        return d.deflate(d.message?.mentions.everyone ?? false)
    }
}