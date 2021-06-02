module.exports = {
    name: "$ephemeral",
    description: "makes this response ephemeral (only interactions)",
    execute: async d => {
        d.container.ephemeral = true
        return d.deflate() 
    }
}