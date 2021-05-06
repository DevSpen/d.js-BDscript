module.exports = {
    name: "$listCommands",
    description: "list commands of a type",
    returns: "?string",
    brackets: true,
    fields: [{
        name: "type",
        type: "string",
        description: "the command type to list its commands"
    }, {
        name: "content",
        type: "string",
        description: "what to return from each command, $data function contains the properties you assigned to the command object."
    }, {
        name: "separator",
        type: "string",
        description: "the separator for each command"
    }],
    execute: async d => {
        let [
            type,
            custom,
            separator = "\n"
        ] = [...d.value.splits]
        
        type = await d.resolveCode(type)
        
        if (type === undefined) return undefined
        
        separator = await d.resolveCode(separator)
        
        if (separator === undefined) return undefined
        
        const commands = d.client.bot.commands.get(type)
        
        const content = []
        
        for (const command of commands?.array() ?? []) {
            if (custom === undefined) {
                if (command.name) content.push(command.name)
            } else {
                d.container.pointTo = "listCommands"
                d.container.listCommands = command 
                const text = await d.resolveCode(custom)
                if (text === undefined) return undefined
                if (text) content.push(text)
            }
        }
        
        return d.deflate(content.join(separator))
    }
}