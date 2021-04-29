const regexes = require("../utils/regexes")

module.exports = {
    name: "$userExists",
    brackets: true,
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