module.exports = {
    name: "$ordinal",
    description: "Adds a suffix to the end of the provided number.",
    fields: [
        {
            name: "number",
            description: "the number to add the suffix to",
            type: "number"
        }
    ],
    returns: "string",
    brackets: true,
    execute: async d => {
        const n = await d.resolveAll()

        if (n === undefined) return undefined

        let str; 

        if (["11", "12", "13"].some(d => n.endsWith(d))) {
            str = "th"
        } else if (n.endsWith("1")) {
            str = "st"
        } else if (n.endsWith("2")) {
            str = "nd"
        } else if (n.endsWith("3")) {
            str = "rd"
        } else {
            str = "th"
        }

        return d.deflate(n + str)
    }
}