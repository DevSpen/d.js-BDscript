module.exports = {
    name: "$return",
    description: "stops code execution", 
    execute: async d => {
        d.container.return = true 
        return d.deflate() 
    }
}