const { default: axios } = require("axios");
const data = require("../main/data");
const Function = require("../structures/Function");

module.exports = new Function({
    name: "$isValidLink",
    description: "checks whether given link is valid",
    returns: "boolean",
    brackets: true,
    fields: [
        {
            name: "link",
            description: "the link to check for",
            type: "string"
        }
    ],
    execute: async (d = data) => {
        const url = await d.resolveAll()

        if (url === undefined) return undefined

        const bool = await new Promise((resolve) => {
            setTimeout(() => {
                resolve(false)
            }, 5000);
            axios.get(url)
            .then(() => resolve(true))
            .catch(() => resolve(false))
        })

        return d.deflate(bool)
    }
})