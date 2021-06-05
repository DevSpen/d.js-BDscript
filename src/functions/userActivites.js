const available = require("../utils/activity-properties")

module.exports = {
    name: "$userActivities",
    description: "returns all activities of an user",
    returns: "?string",
    brackets: true,
    optional: true,
    fields: [{
        name: "userID",
        type: "string",
        description: "the user to get activities from"
    }, {
        name: "custom",
        type: "string",
        description: "data to return for each activity, $data contains properties listed in /activity-properties",
    }, {
        name: "separator",
        type: "string",
        description: "the separator for each activity"
    }],
    execute: async d => {
        if (!d.value.inside) {
            return d.deflate(d.message?.author?.presence.activities.map(act => act.name).join(", ") ?? "")
        }
        
        let [
            userID,
            data,
            separator = "\n"
        ] = [...d.value.splits]
        
        userID = await d.resolveCode(userID)
        
        if (userID === undefined) return undefined
        
        separator = await d.resolveCode(separator)
        
        if (separator === undefined) return undefined
        
        const user = await d.client.users.fetch(userID).catch(err => null)
            
        if (!user) return d.sendError("userID", userID)
        
        const content = []
        
        for (const activity of user.presence.activities ?? []) {
            d.container.pointTo = "activities"
            d.container.activities = activity 
            
            const text = await d.resolveCode(data)
            
            if (text === undefined) return undefined
            else if (text) content.push(text)
        }
        
        delete d.container.pointTo
        
        return d.deflate(content.join(separator))
    }
}