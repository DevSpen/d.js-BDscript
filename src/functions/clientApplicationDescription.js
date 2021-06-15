module.exports = {
    name: "$clientApplicationDescription",
    returns: "?string",
    description: "Returns the application's description. (set in the Developer Portal)",
    execute: async d =>{
        const app = await d.client.application.fetch()

        return d.deflate(app?.description ?? "")
    }
}
