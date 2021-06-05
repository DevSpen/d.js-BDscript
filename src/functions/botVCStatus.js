module.exports = {
    name: "$botVCStatus",
    returns: "number",
    description: "Returns the bot's voice channel status. Check documentation for more info.", 
    execute: async d => {
        return d.deflate(d.value.id, d.client?.voice.connections.status || "")
    }
}

