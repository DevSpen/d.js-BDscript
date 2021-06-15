module.exports = {
    name: "$shardCount",
    returns: "number",
    description: "Returns how many shards the bot has total.",
    execute: async d =>{
        return d.deflate(d.client.ws.shards.size)
    }
}
