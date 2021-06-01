module.exports = {
    name: "$cpu",
    returns: "number",
    description: "returns current cpu load of the machine in the last minute (%)",
    execute: async d => {
        return d.deflate(require("os").loadavg()[0] * 100)
    }
}