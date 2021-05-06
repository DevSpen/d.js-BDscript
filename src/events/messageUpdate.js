module.exports = (client, oldm, newm) => {
    require("../handlers/messageUpdateCommands")(client, oldm, newm)
}