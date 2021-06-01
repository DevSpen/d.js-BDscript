const regexes = require("../utils/regexes")

module.exports = {
    name: "$userExists",
    brackets: true,
    description: "check whether or not given user ID exists",
    fields: [{
        name: "userID",
        type: "string",
        description: "the user to check for"
    }],
    returns: "boolean",
    execute: async d => {
        const [
            userID
        ] = (await d.resolveArray()) || []
        
        if (userID === undefined) return undefined
        
        if (!regexes.USER_ID.test(userID)) return d.deflate(false) 
        
        const user = await d.client.users.fetch(userID).catch(err => null)
        
        return d.deflate(Boolean(user))
    }
}