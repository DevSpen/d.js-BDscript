const { client } = require("../utils/botOptions")

module.exports = {
    name: "$botLeave",
    description: "forces the bot to leave specified servers.",
    brackets: true,
    optional: true,
    fields: [
        {
            name: "guild IDs",
            type: "string",
            description: "the guilds to leave, separated by `;`"
        }
    ],
    execute: async d => {
        if (d.value.inside) {
            const ids = await d.resolveArray()

            if (ids === undefined) return undefined

            const guilds = ids.map(id => d.client.guilds.cache.get(id))

            if (guilds.includes(undefined)) return d.sendError(`guild ID`, ids.filter(id => !d.client.guilds.cache.has(id)).join(", "))

            for (const g of guilds) {
                await g.leave()
            }

            return d.deflate()
        } else {
            await d.message?.guild?.leave()
            return d.deflate()
        }
    }
}