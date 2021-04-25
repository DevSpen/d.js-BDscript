module.exports = {
    name: "$ping",
    execute: async d => {
        return d.deflate(d.value.id, d.client.ws.ping)
    }
}
