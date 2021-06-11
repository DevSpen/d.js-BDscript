const { Webhook, CommandInteraction, MessageEmbed } = require("discord.js")

module.exports = async (channel, container, cnt, fn = "send") => {
    const options = {
        allowedMentions: {
            repliedUser: container.replyMention 
        },
        components: container.components ?? []
    } 
    
    const content = cnt || container.code

    options.content = content

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

    if (fn === "send") {

    }

    if (container.replyWaiting) {
        fn = "editReply"
    }
    
    if (container.updateInteraction) {
        fn = "update"
        delete container.updateInteraction
    }

    const message = await channel[fn](options).catch(() => null)

    if (channel.client?.bot.options.experimental) {
        container.embed = new MessageEmbed()
        container.components = []
        delete container.repliedUser
        delete container.replyMention
        delete container.replyWaiting
    }

    return message 
}