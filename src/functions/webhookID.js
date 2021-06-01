module.exports ={
    name: "$webhookID",
    returns: "?string",
    description: "the ID of the webhook that sent this message",
    execute: async d => {
        return d.deflate(d.message?.webhookID ?? "")
    }
}