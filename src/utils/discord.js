const Discord = require("discord.js")

const FLAGS = () => {
    const obj = {}
    
    for (const [key, val] of Object.entries(Discord.Permissions.FLAGS)) obj[key.toLowerCase().replace(/_/g, "")] = val 
    
    return obj 
}

module.exports.FLAGS = FLAGS

module.exports.getPerms = (perms) => {
    if (!Array.isArray(perms)) perms = [perms]
    
    const flags = FLAGS() 
    
    return perms.map(p => flags[p]) 
}

module.exports.Permissions = (bits) => {
    const perms = new Discord.Permissions(bits)
    
    const flags = Object.keys(Discord.Permissions.FLAGS) 
    
    const current = perms.toArray()
    
    return {
        missing: flags.filter(flag => !current.includes(flag)),
        permissions: current,
        bits,
        has: (perm) => Array.isArray(perm) ? perm.every(p => current.includes(p)) : current.includes(perm), 
        readable: current.goof() 
    }
}
