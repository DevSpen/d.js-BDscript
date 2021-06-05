module.exports = {
    name: "$clearComponents",
    description: "removes components of the response",
    execute: async d => {
        d.container.components = []
        
        return d.deflate()
    }
}