module.exports = {
    onInteraction: ["interaction", (client) => client.on("interaction", (i) => require("../events/interaction")(client, i))], 
    onMusicStart: ["guildMusicStart", (client) => client.on("guildMusicStart", (guild, song) => require("../events/guildMusicStart")(client, guild, song))],
    onMusicEnd: ["guildMusicEnd", (client) => client.on("guildMusicEnd", (guild, song) => require("../events/guildMusicEnd")(client, guild, song))],
    onJoined: ["guildMemberAdd", (client) => client.on("guildMemberAdd", m => require("../events/guildMemberAdd")(client, m))], 
    onReady: ["ready", (client) => client.on("ready", () => require("../events/ready")(client))],
    onReactionAdd: ["messageReactionAdd", (client) => client.on("messageReactionAdd", (r, u) => require("../events/messageReactionAdd")(client, r, u))],
    onReactionRemove: ["messageReactionRemove", (client) => client.on("messageReactionRemove", (r, u) => require("../events/messageReactionRemove")(client, r, u))],
    onLeave: ["guildMemberRemove", (client) => client.on("guildMemberRemove", m => require("../events/guildMemberRemove")(client, m))], 
    onMessage: ["message", (client) => client.on("message", (m) => require("../events/message")(client, m))],
    onMessageUpdate: ["messageUpdate", (client) => client.on("messageUpdate", (old, m) => require("../events/messageUpdate")(client, old, m))],
    onMessageDelete: ["messageDelete", (client) => client.on("messageDelete", (m) => require("../events/messageDelete")(client, m))]
}