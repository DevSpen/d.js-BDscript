module.exports = {
    name: "$clientID",
    returns: "string",
    description: "returns the logged client's ID", 
    execute: async d => {
        return d.deflate(d.value.id, d.client.user?.id || "")
    }
}
