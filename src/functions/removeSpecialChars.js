module.exports = {
    name: "$removeSpecialChars",
    brackets: true,
    description: "Removes special characters from text.",
    fields: [{
        name: "text",
        type: "string",
        description: "The text to remove special characters from."
    }, {
        name: "removeNumbers",
        type: "boolean",
        description: "Whether to filter numbers out of the text."
    }],
    returns: "string", 
    execute: async d => {
        const [
            code,
            removeN = "no"
        ] = (await d.resolveArray()) ?? []

        if (code === undefined) return undefined

        return d.deflate(code.replace(new RegExp(`[^a-zA-Z${removeN === "yes" ? "" : "0-9"}]`, "g"), ""))
    }
}
