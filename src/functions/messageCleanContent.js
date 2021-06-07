const Function = require("../structures/Function");

module.exports = new Function({
    name: "$messageCleanContent",
    description: "the clean content for this message (not user args)",
    returns: "?string",
    execute: async d => {
        return d.deflate(d.message?.cleanContent ?? "")
    }
})