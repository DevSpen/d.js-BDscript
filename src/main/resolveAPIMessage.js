module.exports = async (channel, container, cnt, fn = "send") => {
    const options = {} 
    
    const content = cnt || container.code
    
    if (container.embed?.length || container.embed?.image || container.embed?.author || container.embed?.thumbnail) options.embed = container.embed 
    
    if ((container.embed?.length || container.embed?.image || container.embed?.author || container.embed?.thumbnail) && !options.embed) options.embed = container 
    
    if (container.embed?.files.length || container.files?.length) options.files = container.embed?.files || container.files 
    
    const message = await channel[fn](content, options).catch(err => null) 
    
    return message 
}