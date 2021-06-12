const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "$addField",
    description: "Sets an embed field",
    examples: [],
    fields: [{
        name: "embed index",
        description: "the index of the embed to add this field to, if no embed exists for that index, it'll be created.",
        type: "number"
    }, {
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
        const [index, name, value, inline = "no"] = (await d.resolveArray()) || []
        
        if (index === undefined) return undefined
    
        d.container.getEmbed(index).addField(name, value, inline === "yes")
        
        return d.deflate()
    }
}