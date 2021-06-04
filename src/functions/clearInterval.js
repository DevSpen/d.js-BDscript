module.exports = {
    name: "$clearInterval",
    description: "clears an interval using its ID",
    fields: [
        {
            name: "ID",
            description: "the interval ID",
            type: "number"
        }
    ],
    brackets: true,
    execute: async d => {
        const id = await d.resolveAll()

        if (id === undefined) return undefined
        
        const int = d.client.bot.intervals.get(id)

        if (!int) return d.sendError("interval ID", id)

        clearInterval(int)

        d.client.bot.intervals.delete(id)

        return d.deflate()
    }
}