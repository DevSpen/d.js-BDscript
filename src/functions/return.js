module.exports = {
    name: "$return",
    execute: async d => {
        d.container.return = true 
        return d.deflate() 
    }
}