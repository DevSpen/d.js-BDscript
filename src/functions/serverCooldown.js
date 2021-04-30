const ms = require("ms")

module.exports = {
    name: "$serverCooldown",
    brackets: true,
    description: "set a server cooldown for this command, $data contains \`time\` which returns the time left before the cooldown expires.",
    fields: [{
        name: "duration",
        type: "string",
        description: "the cooldown time"
    }, {
        name: "error",
        type: "string",
        description: "the code to execute when the cooldown is enabled"
    }],
    execute: async d => {
        let [
            time,
            error
        ] = d.value.splits 
        
        time = await d.resolveCode(time)
        
        if (time === undefined) return undefined
        
        time = ms(time)
        
        if (!time) return d.sendError(`:x: Invalid cooldown time in \`$serverCooldown\``)
        
        const data = await d.client.bot.db.get("cooldowns", d.message?.guild?.id) 
        
        if (data.id && time - (Date.now() - data.startedAt) > 999) {
            d.container.pointTo = "cooldown"
            d.container.cooldown = {
                time: d.client.bot.parse(time - (Date.now() - data.startedAt))
            }
            
            return d.deflate(d.value.id, "", d.fieldsIn(error), error) 
        } else {
            data.startedAt = Date.now()
            data.type = "server"
            data.time = time 
            await d.client.bot.db.set("cooldowns", d.message?.guild?.id, data)
        }
        
        return d.deflate() 
    }
}