module.exports = {
    name: "$reply",
    description: "make this message an inline reply (or interaction reply)",
    brackets: true,
    optional: true,
    fields: [
        {
            name: "mention",
            description: "whether to mention the replied user",
            type: "boolean"
        }
    ],
    execute: async d => {
        d.container.reply = true
        
        if (d.value.inside) {
            const m = await d.resolveAll()

            if (m === undefined) return undefined

            d.container.replyMention = m === "yes"

            return d.deflate()
        }
        
        return d.deflate()
    }
}