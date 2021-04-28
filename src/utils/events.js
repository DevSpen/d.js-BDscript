module.exports = {
    onJoined: ["guildMemberAdd", (client) => client.on("guildMemberAdd", m => require("../events/guildMemberAdd")(client, m))], 
    onMessage: ["message", (client) => client.on("message", (m) => require("../events/message")(client, m))]
}