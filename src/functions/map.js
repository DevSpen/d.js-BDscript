module.exports = {
    name: "$map",
    description: "loops through every provided element executing given code.",
    brackets: true,
    returns: "?string",
    fields: [{
        name: "separator",
        description: "the separator for each loop output, use `skip` to omit code output.",
        type: "string"
    }, {
        name: "elements",
        description: "value or values to loops through, separated by `;`.",
        type: "string"
    }, {
        name: "code",
        description: "code to execute for each element, $data will contain `value` property with the value of each element.",
        type: "string"
    }],
    execute: async d => {
        const fields = [...d.value.splits]
        const separator = await d.resolveCode(fields.shift())
        if (separator === undefined) return undefined
        const code = fields.pop()
        const data = await d.resolveCode(fields.join(";"))
        if (data === undefined) return undefined
        const content = []
        for (const value of data.split(";")) {
            d.container.pointTo = "map"
            d.container.map = { value } 
            const text = await d.resolveCode(code)
            if (text === undefined) return undefined
            else if (text) content.push(text)
        }
        return d.deflate(separator === "skip" ? "" : content.join(separator))
    }
}