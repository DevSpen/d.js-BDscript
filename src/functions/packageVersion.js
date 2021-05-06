module.exports = {
    name: "$packageVersion",
    description: "returns package version that you are using",
    returns: "string",
    execute: async d => {
        return d.deflate(require("../../package.json").version) 
    }
}