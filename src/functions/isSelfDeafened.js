module.exports = {
    name: "$isSelfDeafened",
    description: "Returns whether or not a user is self-deafened.",
    returns: "boolean",
    brackets: true,
    optional: true,
    fields: [{
        name: "guildID",
        description: "The server to get the data from.",
        type: "string"
    }, {
        name: "userID",
        description: "The user to get the data for.",
        type: "string"
    }],
    execute: async d => {
        if (!d.value.inside) {
            return d.deflate(d.message?.member?.voice.selfDeaf ?? "")
        }

        const [
            guildID,
            userID
        ] = (await d.resolveArray()) || []

        if (guildID === undefined) return 

        const guild = d.client.guilds.cache.get(guildID)

        if (!guild) return d.sendError("guildID", guildID)

        const member = await guild.members.fetch(userID || "1").catch(err => null)

        if (!member) return d.sendError("userID", userID)

        return d.deflate(member.voice.selfDeaf)
    }
}
