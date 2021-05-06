module.exports ={
    name: "$ram",
    description: "returns current memory usage in megabytes",
    returns: "number",
    execute: async d => {
        return d.deflate(process.memoryUsage().rss / 1024 / 1024)
    }
}