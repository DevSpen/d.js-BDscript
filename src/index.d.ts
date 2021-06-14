declare type CommandTypes = 
    "command" |
    "botAddCommand" |
    "botLeaveCommand" |
    "buttonCommand" |
    "deleteCommand" | 
    "slashCommand" | 
    "updateCommand" | 
    "readyCommand" |
    "reactionAddCommand" |
    "reactionRemoveCommand" | 
    "leaveCommand" | 
    "joinCommand" | 
    "musicStartCommand" | 
    "musicEndCommand" | 
    "spaceCommand"

declare type EventTypes = 
    "onMessage" | 
    "onMessageUpdate" | 
    "onMessageDelete" |
    "onReactionAdd" |
    "onReactionRemove" |
    "onLeave" |
    "onJoined" |
    "onBotGuildAdd" |
    "onBotGuildLeave" |
    "onMusicEnd" |
    "onMusicStart" |
    "onReady" |
    "onInteraction"

declare type CustomIntentOverload = "all" | "non_privileged"

declare type Intents = "guilds" |
    "guildmembers" |
    "guildbans" |
    "guildemojis" |
    "guildintegrations" |
    "guildwebhooks" |
    "guildinvites" |
    "guildvoicestates" |
    "guildpresences" |
    "guildmessages" |
    "guildmessagereactions" |
    "guildmessagetyping" |
    "directmessages" |
    "directmessagereactions" |
    "directmessagetyping" 