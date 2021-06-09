module.exports = {
     name: "$serverSystemChannelID",
     description: "Returns a server’s system messages channel ID (which is set in community-settings).",
     brackets: true,
     optional: true,
     fields: [
         {
             name: "guildID",
             description: "The server to return the data for.",
             type: "string"
         }
     ],
     returns: "?string",
     execute: async d => {
         if (d.value.inside) {
             const guildID = await d.resolveAll()

             if (guildID === undefined) return undefined

             const guild = d.client.guilds.cache.get(guildID)

             if (!guild) return d.sendError("guildID", guildID)

             return d.deflate(guild.systemChannelID)
         } else {
             return d.deflate(d.message?.guild?.systemChannelID ?? "")
         }
     }
 }
