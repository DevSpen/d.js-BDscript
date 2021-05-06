module.exports = {
    name: "$commandInfo",
    description: "returns command info from given command type and name/id",
    fields: [{
        name: "type",
        description: "the command type",
        type: "string"
    }, {
        name: "option",
        description: "the ID or name of this command",
        type: "any"
    }, {
        name: "property",
        description: "property to return from this command",
        type: "any"
    }],
    returns: "?any",
    brackets: true,
    execute: async d => {
        const [
            type,
            option,
            property
        ] = (await d.resolveArray()) || []
        
        if (!type) return undefined
        
        const commands = d.client.bot.commands.get(type)
        
        const cmd = commands?.find(cmd => (cmd.name ?? cmd.channel) === option || cmd.id === option)
        
        const data = cmd?.[property]
        
        return d.deflate(typeof data === "object" ? require("util").inspect(data) : data ?? "")
    }
}