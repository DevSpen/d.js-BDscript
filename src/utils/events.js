module.exports = {
    onMessage: ["message", (client) => client.on("message", (m) => require("../events/message")(client, m))]
}