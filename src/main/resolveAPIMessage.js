module.exports = async (channel, container, cnt) => {
    const options = {} 
    
    const content = cnt || container.code
    
    if (container.embed?.length) options.embed = container.embed 
    
    if (container.length && !options.embed) options.embed = container 
    
    if (container.attachment) options.attachment = container.attachment
    
    const message = await channel.send(content, options).catch(err => null) 
    
    return message 
}