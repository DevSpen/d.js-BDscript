module.exports = {
    name: "$argCount",
    description: "returns argument count",
    returns: "number",
    execute: async d => {
        return d.deflate(d.args?.length ?? 0)
    }
}