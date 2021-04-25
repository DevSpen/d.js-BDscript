module.exports = {
    name: "$guildID",
    execute: async d => {
        return d.deflate(d.value.id, d.message.guild ? d.message.guild.id : "")
    }
}