module.exports = {
    name: "$clientDestroy",
    description: "destroys the current websocket connection to the api, might aswell ends your process.",
    execute: async d => {
        d.client.destroy()
        return undefined
    }
}