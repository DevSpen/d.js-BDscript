module.exports = {
    name: "$isBotVerified",
    returns: "boolean",
    description: "Returns whether or not the bot is verified.",
    execute: async d =>{
        return d.deflate(d.client?.user?.verified ?? "")
    }
}
