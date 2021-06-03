module.exports = {
    name: "$allChannelCount",
    description: "return channel count your bot can see",
    returns: "number",
    fields: [
        {
            name: "types",
            description: "channel types to count, separated by `;`",
            type: "string"
        }
    ],
    brackets: true,
    optional: true,
    execute: async d => {
        if (d.value.inside) {
            const types = await d.resolveArray()

            if (types === undefined) return undefined

            return d.deflate(d.client.channels.cache.filter(c => types.includes(c.type)).size)
        } else {
            return d.deflate(d.client.channels.cache.size)
        }
    }
}