module.exports = {
    name: "$isBotPublic",
    returns: "?boolean",
    description: "Returns whether or not the bot is public. (set in the Developer Portal)",
    execute: async d =>{
        const app = await d.client.application.fetch()

        return d.deflate(app.botPublic ?? "")
    }
}
