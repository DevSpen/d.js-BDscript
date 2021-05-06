module.exports = {
    name: "$isValidInvite",
    description: "checks whether a invite link exists on discord",
    returns: "boolean",
    fields: [{
        name: "invite",
        description: "the invite to check",
        type: "string"
    }],
    brackets: true,
    execute: async d => {
        const url = await d.resolveAll()
        
        if (url === undefined) return undefined
        
        const i = await d.client.fetchInvite(url).catch(err => null)
        
        return d.deflate(Boolean(i))
    }
}