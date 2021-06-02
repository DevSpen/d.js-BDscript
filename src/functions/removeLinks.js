module.exports = {
    name: "$removeLinks",
    brackets: true,
    description: "Removes links from the provided text.",
    fields: [{
        name: "text",
        type: "string",
        description: "The text to remove links from."
    }],
    returns: "string", 
    execute: async d => {
        const code = await d.resolveAll()

        if (code === undefined) return undefined

        return d.deflate(code.replace(/(?:https?|ftp)://[\n\S]+/g, ''))
}
  }
