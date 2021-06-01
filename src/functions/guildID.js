module.exports = {
    name: "$guildID",
    returns: "?string",
    description: "returns the current guild ID", 
    execute: async d => {
        return d.deflate(d.value.id, d.message.guild ? d.message.guild.id : "")
    }
}