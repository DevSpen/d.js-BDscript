const available = require("../utils/messageProperties")

module.exports = {
    name: "$oldMessage",
    brackets: true,
    optional: true,
    returns: "?any",
    fields: [{
        name: "option",
        description: "property to get, checl /message-properties for available options.",
        type: "string",
    }, {
        name: "index",
        description: "incase field name/value option is picked, this option will be used to choose which field name/value to get.",
        type: "number"
    }, {
        name: "index",
        description: "Which embed to get the info from, incase there were multiple embeds attached to this message.",
        type: "number"
    }],
    description: "gets info of the old message data before it was updated, uses options in /message-properties",
    execute: async d => {
        if (!d.value.inside) {
            return d.deflate(d.data?.old_message?.content ?? "")
        }
        
        const [
            property,
            index = 1,
            embedIndex = 1 
        ] = (await d.resolveArray()) || []
        
        if (property === undefined) return 
        
        const prop = available[property]
        
        if (!prop) return d.sendError("option", property)
        
        const data = eval(`d.data?.old_message?${typeof prop === "function" ? prop(Number(embedIndex) - 1 ?? 0, Number(index) - 1 ?? 0) : prop}`) ?? ""
        
        return d.deflate(data)
    }
}