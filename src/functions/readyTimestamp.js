module.exports = {
    name: "$readyTimestamp",
    returns: "number",
    description: "Timestamp of the time the client was last ready at in milliseconds.", 
    execute: async d => {
        return d.deflate(d.value.id, d.client?.readyTimestamp || "")
    }
}
