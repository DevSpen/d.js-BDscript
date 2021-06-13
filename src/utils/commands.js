module.exports = {
    command: {
        name: true,
        code: true,
        aliases: false 
    },
    buttonCommand: {
        name: false,
        code: true 
    },
    slashCommand: {
        name: true,
        code: true 
    }, 
    musicEndCommand: {
        channel: true,
        code: true
    },
    musicStartCommand: {
        channel: true,
        code: true
    },
    botAddCommand: {
        channel: true,
        code: true
    },
    botLeaveCommand: {
        channel: true,
        code: true 
    },
    deleteCommand: {
        channel: true,
        code: true,
    },
    reactionAddCommand: {
        channel: true,
        code: true 
    },
    reactionRemoveCommand: {
        channel: true,
        code: true 
    },
    updateCommand: {
        channel: true,
        code: true,
    },
    readyCommand: {
        channel: true,
        code: true
    },
    spaceCommand: {
        name: false, 
        code: true
    },
    joinCommand: {
        channel: true,
        code: true
    },
    leaveCommand: {
        channel: true,
        code: true
    }
}