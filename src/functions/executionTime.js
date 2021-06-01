module.exports = {
    name: "$executionTime",
    type: "number",
    description: "the time it took to execute the above code.", 
    execute: async d => {
        return d.deflate(d.value.id, Date.now() - d.startedAt)
    }
}