const moment = require("moment")

module.exports = {
    name: "$formatDate",
    description: "formats given ms to readable date",
    brackets: true,
    fields: [
        {
            name: "ms",
            description: "the ms to format",
            type: "string"
        },
        {
            name: "format",
            description: "format to apply, check [moment docs](https://momentjs.com) for more info.",
            type: "string"
        }
    ],
    returns: "string",
    execute: async d => {
        const [
            date,
            format = "MMMM Do YYYY"
        ] = (await d.resolveArray()) ?? []

        if (date === undefined) return undefined

        const formatted = moment(new Date(Number(date)).toISOString()).format(format)

        return d.deflate(formatted)
    }
}