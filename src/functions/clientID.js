module.exports = {
    name: "$clientID",
    execute: async d => {
        return d.deflate(value.id, d.client.user.id)
    }
}
