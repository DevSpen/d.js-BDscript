module.exports = {
    name: "$slashOption",
    description: "return slash option using the option name.",
    returns: "?any",
    fields: [
        {
            name: "option name",
            description: "the option to get the value from",
            type: "string"
        }
    ],
    brackets: true,
    execute: async d => {
        const n = await d.resolveAll()

        if (n === undefined) return undefined

        const options = d.data.slash_options ?? []

        return d.deflate(options.find(d => d.name === n)?.value)
    }
}