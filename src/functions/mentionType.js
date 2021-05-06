const { ROLE, CHANNEL, USER } = require("../utils/regexes")

module.exports = {
    name: "$mentionType",
    description: "returns type of the given mention, or `none`",
    returns: "string",
    brackets: true,
    fields: [{
        name: "mention",
        description: "the argument to check its mention",
        type: "string"
    }],
    execute: async d => {
        const option = await d.resolveAll()
        
        if (option === undefined) return undefined
        
        return d.deflate(USER.test(option) ? "user" : CHANNEL.test(option) ? "channel" : ROLE.test(option) ? "role" : "none")
    }
}