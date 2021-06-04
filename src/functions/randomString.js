const { generate } = require("../utils/characters")

module.exports = {
    name: "$randomString",
    description: "generates a random string of given length",
    optional: true,
    brackets: true,
    fields: [
        {
            name: "length",
            description: "string length",
            type: "number"
        }
    ],
    returns: "string",
    execute: async d => {
        if (!d.value.inside) {
            const str = d.container.randomStrings["default"] ?? generate()

            d.container.randomStrings["default"] = str

            return d.deflate(str)
        } else {
            const length = await d.resolveAll()

            if (length === undefined) return undefined

            const str = d.container.randomStrings[length] ?? generate(length)

            d.container.randomStrings[length] = str

            return d.deflate(str)
        }
    }
}