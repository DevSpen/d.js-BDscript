module.exports = async (channel, container, cnt, fn = "send") => {
    const options = {} 
    
    const content = cnt || container.code
    
    if (container.embed?.length) options.embed = container.embed 
    
    if (container.length && !options.embed) options.embed = container 
    
    if (container.attachment) options.attachment = container.attachment
    
    const message = await channel[fn](content, options).catch(err => null) 
    
    return message 
}