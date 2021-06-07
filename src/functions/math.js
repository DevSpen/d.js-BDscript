const getMath = require("../utils/getMath")

module.exports = {
    name: "$math",
    description: "run math query without the use of multiple functions",
    fields: [
        {
            name: "equation",
            description: "equation to solve",
            type: "string"
        }
    ],
    returns: "?number",
    brackets: true,
    execute: async d => {
        const equation = await d.resolveAll()

        if (equation === undefined) return undefined

        const str = getMath(equation)

        if (!str.length) return d.sendError(`:x: Empty equation!`)

        try {
            var n = eval(str)
        } catch (error) {
            return d.sendError(`:x: Equation could not be solved! (syntax error)`)
        }

        return d.deflate(n || 0)
    }
}