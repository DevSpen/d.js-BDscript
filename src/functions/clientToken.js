module.exports = {
    name: "$clientToken",
    returns: "string",
    description: "Returns the bot’s token. This should be kept private to the developer, read the documentation for more info.", 
    execute: async d => {
        return d.deflate(d.value.id, d.client?.token || "")
    }
}
