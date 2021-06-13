const data = require("../main/data");
const Function = require("../structures/Function");

module.exports = new Function({
    name: "$callFunction",
    description: "calls a pre-created function.",
    brackets: true,
    fields: [
        {
            name: "function name",
            description: "the name for this function",
            type: "string"
        }
    ],
    execute: async (d = data) => {
        const name = await d.resolveAll()

        if (name === undefined) return undefined

        const code = d.client.bot.custom_functions.get(name)

        if (code === undefined) return d.sendError(`function name`, name)

        try {
            var compiled = d.client.bot.compile(d.client, code)
        } catch(err) {
            return d.sendError(err.message)
        }
        
        let newData = d.clone("command", {compiled}) 
        
        const data = await d.client.bot.interpreter(newData, true)
        
        if (!data) return undefined

        d.container.embeds = d.container.embeds.concat(data.embeds)
        d.container.components = data.components
        d.container.replyMention = data.replyMention
        d.container.replyWaiting = data.replyWaiting
        d.container.ephemeral = data.ephemeral
        d.container.updateInteraction = data.updateInteraction

        return d.deflate(data.code)
    }
})