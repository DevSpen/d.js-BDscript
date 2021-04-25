const Discord = require("discord.js")

module.exports.permissions = (bits) => {
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