module.exports = (client, i) => {
    if (i.isCommand()) require("../handlers/slashCommands.js")(client, i)
}