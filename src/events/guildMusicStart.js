module.exports = (client, guild, song) => {
    require("../handlers/musicStartCommands")(client, guild, song)
}