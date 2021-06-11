'use strict';

/**
 * The command type.
 * @typedef {string} CommandType
 */
exports.CommandType = createEnum([
    "command"
])

function createEnum(keys) {
    const obj = {};
    for (const [index, key] of keys.entries()) {
      if (key === null) continue;
      obj[key] = index;
      obj[index] = key;
    }
    return obj;
}

/**
 * Default options for client
 * @property {boolean} [respondToBots=false] whether to respond to bots
 * @property {boolean} [guildOnly=true] whether the bot can only be used in guilds.
 * @property {ClientOptions} [ClientOptions={}] the options for the discord.js client.
 * @property {string} token the token to use for this bot.
 * @property {boolean} [mentionAsPrefix=false] whether the bot can respond when it is mentioned as a form or prefix.
 * @property {string[]} users the users this bot will react to.
 * @property {string|string[]} prefix the prefix or prefixes for this bot.
 * @property {boolean} [experimental=false] whether to enable experimental mode.
 * @property {string|string[]} intents the intent or intents to pass to client.
 */ 
exports.DefaultBotOptions = {
    respondToBots: false,
    guildOnly: true,
    client: {},
    token: "",
    mentionAsPrefix: false, 
    users: undefined, 
    prefix: [],
    experimental: false,
    intents: []
}

module.exports.EventTypes = {
    onMessage: "onMessage",
    onMessageUpdate: "onMessageUpdate",
    onMessageDelete: "onMessageDelete",
    onReactionAdd: "onReactionAdd",
    onReactionRemove: "onReactionRemove",
    onLeave: "onLeave",
    onJoined: "onJoined",
    onMusicStart: "onMusicStart",
    onMusicEnd: "onMusicEnd",
    onReady: "onReady",
    onInteraction: "onInteraction"
}

module.exports.CommandTypes = {
    buttonCommand: "buttonCommand",
    slashCommand: "slashCommand",
    command: "command",
    deleteCommand: "deleteCommand",
    updateCommand: "updateCommand",
    readyCommand: "readyCommand",
    reactionAddCommand: "reactionAddCommand",
    reactionRemoveCommand: "reactionRemoveCommand",
    leaveCommand: "leaveCommand",
    joinCommand: "joinCommand",
    musicStartCommand: "musicStartCommand",
    musicEndCommand: "musicEndCommand",
    spaceCommand: "spaceCommand"
}

/**
 * @typedef {Object} CommandData 
 * @property {string} code the code this command will execute everytime its called.
 * @property {CommandType} type the type of this command.
 * @property {string} name the name for this command.
 * @property {array} aliases the aliases for this command.
 * @property {string[]} channel the channel ID to send bot response to. 
 */

