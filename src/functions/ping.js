module.exports = {
    name: "$ping",
    returns: "?number",
    description: "returns the websocket latency in ms", 
    execute: async d => {
        return d.deflate(d.value.id, d.client.ws.ping)
    }
}
