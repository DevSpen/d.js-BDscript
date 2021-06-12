'use strict';

const { User, Client, TextChannel, ActivityType, ClientOptions, MessageActionRow, PresenceStatusData, Message, MessageEmbed, MessageAttachment } = require("discord.js")
const Bot = require("../structures/Bot")

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

/**
 * @typedef {Object} TrackData
 * @property {string} url the url to this song.
 * @property {string} title the song title
 * @property {string} uri the song uri.
 * @property {string} image the image of the banner.
 * @property {string} thumbnail the thumbnail.
 * @property {string} duration the duration of the song. 
 * @property {User} user the user that added this song.
 */

/**
 * The type of a function field.
 * @typedef {string} FieldType
 * * boolean 
 * * number
 * * string
 */

/**
 * @typedef {Object} FieldData
 * @property {string} name the field name.
 * @property {string} description the description for this field.
 * @property {FieldType} type the type of this field.
 * @property {boolean} required whether this field is required
 * @property {Any} default the default value of the field. 
 */

/**
 * @typedef {Object} StatusData
 * @property {number} duration the duration for this status in ms.
 * @property {?PresenceStatusData} presence the presence for this status.  
 * @property {?ActivityType} type the activity type.
 * @property {?string} url the url for the streaming status.
 * @property {?boolean} idle whether the client is idle.
 * @property {string} name the status text / name.
 */

/**
 * 
 * @typedef {string} Intent The intents to enable (through array), or one of these strings:
 * * `all` - Enables all intents. 
 * * `non_privileged` - Enables all intents except privileged ones.
 * @example "all"
 * @example ["guilds", "guildintegrations"]
 */

/**
 * @typedef {string} Intents Available intents:
 * * guilds
 * * guildmembers
 * * guildbans
 * * guildemojis
 * * guildintegrations
 * * guildwebhooks
 * * guildinvites
 * * guildvoicestates
 * * guildpresences
 * * guildmessages
 * * guildmessagereactions
 * * guildmessagetyping
 * * directmessages
 * * directmessagereactions
 * * directmessagetyping
 */

/**
 * 
 * @typedef {Object} Container 
 * @property {object} randomStrings the generated strings.
 * @property {object} randoms the random numbers.
 * @property {object} randomTexts the random texts.
 * @property {MessageEmbed[]} embeds the embeds to send.
 * @property {MessageActionRow[]} components the component rows.
 * @property {boolean} updateInteraction whether this reply will update an interaction. 
 * @property {MessageAttachment[]} attachments the attachments to send.
 * @property {boolean} replyInteraction whether this is a reply to an interaction.
 * @property {boolean} ephemeral whether this response will be ephemeral.
 * @property {boolean} replyMention whether this response will mention the user.
 * @property {boolean} replyWaiting whether this response is waiting to be undeferred.
 * @property {object} invites the invites for this execution.
 * @property {object} keywords created local variables. 
 */

/**
 * @typedef {Object} DataExecution
 * @property {Client} client the client of this connection.
 * @property {TextChannel} mainChannel the channel to send errors in.
 * @property {Bot} bot the instance of d.js-bdscript. 
 * @property {TextChannel} channel the channel this data will be sent to.
 * @property {Message} message the data for this event.
 * @property {object} data the extras of this function.
 * @property {Container} container the container for this execution. 
 */

/**
 * 
 * @param {DataExecution} DATA the data used to execute this command.
 * @returns {Object}
 */
function execute(DATA = {}) {}

/**
 * @typedef {Object} FunctionData
 * @property {string[]} examples examples for this function usage.
 * @property {string} name the name for the function. 
 * @property {string} description the description for this function.
 * @property {?FieldData[]} fields the fields for this function. 
 * @property {string} returns what does the function return.
 * @property {boolean} brackets whether this function uses brackets.
 * @property {boolean} optional whether these brackets are optional.
 * @property {string[]} requires modules required to run this function.
 * @property {string[]} optional_modules optional modules to improve this function performance.
 * @property {boolean} disabled whether this function is disabled. 
 * @property {execute} execute the function handling the function. 
 */

/**
 * Options for client
 * @typedef {Object} BotOptions
 * @property {boolean} [respondToBots=false] whether to respond to bots
 * @property {boolean} [guildOnly=true] whether the bot can only be used in guilds.
 * @property {ClientOptions} [client={}] the options for the discord.js client.
 * @property {string} token the token to use for this bot.
 * @property {boolean} [mentionAsPrefix=false] whether the bot can respond when it is mentioned as a form or prefix.
 * @property {string[]} users the users this bot will react to.
 * @property {string|string[]} prefix the prefix or prefixes for this bot.
 * @property {boolean} [experimental=false] whether to enable experimental mode.
 * @property {Intents[]|string} intents the intent or intents to pass to client.
 */ 

/**
 * Variable data.
 * @typedef {Object} Variable
 * @property {string} name the name for this variable.
 * @property {string} type the type for this variable, either "string" or "integer".
 * @property {any} value default value for this variable. 
 */