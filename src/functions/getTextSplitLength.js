module.exports = {
    name: "$getTextSplitLength",
    execute: async d => {
        return d.deflate(d.container.splits.length)
    }
}