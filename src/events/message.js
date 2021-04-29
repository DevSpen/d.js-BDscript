module.exports = (client, m) => {
    require("../handlers/commands")(client, m)
    
    require("../handlers/spaceCommands")(client, m) 
}