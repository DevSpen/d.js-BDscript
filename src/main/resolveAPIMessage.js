const { Webhook, CommandInteraction, MessageEmbed, TextChannel, Message, DMChannel } = require("discord.js")

/**
 * 
 * @param {TextChannel|Webhook|CommandInteraction|Message|DMChannel} channel the channel to send this message to.
 * @param {import("../utils/Constants").Container} container the container for this execution. 
 * @param {?string} cnt content to send.  
 * @param {?string} [fn="send"] the function to cast over channel.  
 * @returns {Promise<Message|object>}
 */
module.exports = async (channel, container, cnt, fn = "send") => {
    const options = {
        allowedMentions: {
            repliedUser: container.replyMention 
        },
        embeds: [],
        files: container.attachments, 
        components: container.components ?? []
    } 
    
    const content = cnt ?? container.code

    options.content = content

    if (container.ephemeral) {
        options.ephemeral = true
    }

    for (const embed of container.embeds) {
        if ((embed.length || embed?.image || embed?.author || embed?.thumbnail)) options.embeds.push(embed)
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
        delete container.attachments
    }

    return message 
}