const regexes = require("../utils/regexes")

module.exports = {
    name: "$findUser",
    brackets: true,
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