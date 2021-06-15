module.exports = {
    name: "$clientApplicationDescription",
    returns: "?string",
    description: "Returns the application's description. (set in the Developer Portal)",
    execute: async d =>{
        return d.deflate(d.client?.application?.description ?? "")
    }
}
