const ms = require("ms")

module.exports = {
    name: "$wait",
    description: "stops code execution for given time",
    fields: [
        {
            name: "time",
            description: "time to wait before continuing code execution",
            type: "string"
        }
    ],
    brackets: true,
    execute: async d => {
        const t = await d.resolveAll()

        await new Promise(r => setTimeout(r, ms(t)))

        return d.deflate()
    }
}