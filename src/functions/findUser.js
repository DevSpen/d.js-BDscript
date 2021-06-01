const regexes = require("../utils/regexes")

module.exports = {
    name: "$findUser",
    brackets: true,
    description: "finds a user by using either their ID, username or mention.",
    returns: "?string",
    fields: [{
        name: "option",
        type: "string",
        description: "the user ID, mention or username"
    }, {
        name: "returnAuthorID",
        type: "boolean",
        description: `whether to return the author ID if no user was found`
    }],
    execute: async d => {
        const [
            option,
            returnAuthor = "yes"
        ] = (await d.resolveArray()) || []
        
        if (option === undefined) return undefined
        
        let user 
        
        if (regexes.USER.test(option)) {
            user = await d.client.users.fetch(option.match(regexes.USER)[1]).catch(err => null)
        }
        
        if (!user && regexes.USER_ID.test(option)) {
            user = await d.client.users.fetch(option).catch(err => null)
        }
        
        if (!user) {
            user = d.client.users.cache.find(u => u.username === option || u.tag === option)
        }
        
        
        return d.deflate(user?.id || (returnAuthor === "yes" ? d.message?.author?.id || "" : ""))
    }
}