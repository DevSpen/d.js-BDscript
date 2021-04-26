module.exports = {
    name: "$executionTime",
    execute: async d => {
        return d.deflate(d.value.id, Date.now() - d.startedAt)
    }
}