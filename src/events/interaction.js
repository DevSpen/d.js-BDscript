const { Interaction } = require("discord.js")

module.exports = (client, i = new Interaction()) => {
    if (i.isCommand()) require("../handlers/slashCommands.js")(client, i)
    if (i.isMessageComponent()) require("../handlers/buttonCommands")(client, i)
}