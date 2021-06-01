module.exports = {
    name: "$dateStamp",
    description: "returns current date since 1970 in ms",
    returns: "number", 
    execute: async d => {
        return d.deflate(Date.now())
    }
}