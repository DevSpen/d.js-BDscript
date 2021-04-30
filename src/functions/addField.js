module.exports = {
    name: "$addField",
    description: "Sets an embed field",
    examples: [],
    fields: [{
        name: "name",
        description: "the name of the field",
        type: "string",
    }, {
        name: "value",
        description: "the value for this field",
        type: "string"
    }, {
        name: "inline",
        description: "whether or not this field should be inline",
        type: "boolean"
    }],
    brackets: true,
    execute: async d => {
        const [name, value, inline = "no"] = (await d.resolveArray()) || []
        
        if (name === undefined) return undefined
        
        d.container.embed.addField(name, value, inline === "yes")
        
        return d.deflate()
    }
}