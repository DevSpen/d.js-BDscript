const { Webhook, CommandInteraction } = require("discord.js")

module.exports = async (channel, container, cnt, fn = "send") => {
    const options = {
        allowedMentions: {
            repliedUser: container.replyMention 
        }
    } 
    
    const content = cnt || container.code
    
    if (container.ephemeral) {
        options.ephemeral = true
    }

    if (container.embed?.length || container.embed?.image || container.embed?.author || container.embed?.thumbnail) options.embed = container.embed 
    
    if ((container.length || container?.image || container?.author || container?.thumbnail) && !options.embed) options.embed = container 
    
    if (container.embed?.files.length || container.files?.length) options.files = container.embed?.files || container.files 
     
    if (channel instanceof Webhook || channel instanceof CommandInteraction) {
        if (options.embed) {
            if (!options.embeds) options.embeds = [options.embed]
            else options.embeds.push(options.embed)
            delete options.embed
        }
    }

    const message = await channel[container.replyWaiting ? "editReply" : fn](content || null, options).catch(err => null) 
    
    return message 
}