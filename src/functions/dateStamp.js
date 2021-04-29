module.exports = {
    name: "$dateStamp",
    execute: async d => {
        return d.deflate(Date.now())
    }
}