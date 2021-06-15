module.exports = {
    name: "$isBotPublic",
    returns: "?boolean",
    description: "Returns if the bot is public or not. (set in the Developer Portal)",
    execute: async d =>{
        return d.deflate(d.client?.application?.botPublic ?? "")
    }
}
