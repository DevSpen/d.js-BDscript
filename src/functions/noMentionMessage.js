const { USER, ROLE, CHANNEL } = require("../utils/regexes")

module.exports = {
    name: "$noMentionMessage",
    description: "return user arguments without mentions",
    returns: "string",
    execute: async d => {
        let content = d.args?.join(" ") ?? ""

        const regexes = [USER, ROLE, CHANNEL]

        for (const regex of regexes) {
            content = content.replace(new RegExp(regex.source, "g"), "")
        }

        return d.deflate(content.trim())
    }
}