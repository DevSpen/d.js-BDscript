module.exports = {
    command: {
        name: true,
        code: true,
        aliases: false 
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