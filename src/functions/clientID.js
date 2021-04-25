module.exports = {
    name: "$clientID",
    execute: async d => {
        return d.deflate(d.value.id, d.client.user.id)
    }
}
