module.exports = {
    name: "$authorAvatar",
    description: "returns author avatar",
    returns: "?string",
    execute: async d => {
        return d.deflate(d.message?.author?.displayAvatarURL({
            dynamic: true,
            size: 4096
        }) ?? "")
    }
}