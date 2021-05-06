module.exports = {
    name: "$shardID",
    returns: "?number",
    description: "the shard this guild is in",
    execute: async d =>{
        return d.deflate(d.message?.guild?.shardID ?? "")
    }
}