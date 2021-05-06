module.exports = {
    name: "$exitProcess",
    description: "ends the current process",
    execute: async d => {
        process.exit() 
    }
}