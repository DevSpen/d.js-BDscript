module.exports = {
    name: "$getTextSplitLength",
    returns: "number",
    description: "returns the ampunt of elements in $textSplit", 
    execute: async d => {
        return d.deflate(d.container.splits.length)
    }
}