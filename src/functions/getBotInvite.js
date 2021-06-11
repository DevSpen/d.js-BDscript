const data = require("../main/data");
const Function = require("../structures/Function");
const { getPerms } = require("../utils/discord");

module.exports = new Function({
    name: "$getBotInvite",
    description: "gets the bot invite",
    returns: "string",
    brackets: true,
    optional: true,
    fields: [
        {
            name: "permissions",
            description: "permissions to assign to this invite, separated by `;`.",
            type: "string"
        }
    ],
    execute: async (d = data) => {
        if (d.value.inside) {
            const [
                ...permOrPerms
            ] = await d.resolveArray()
            
            const perms = getPerms(permOrPerms)
        
            if (perms.includes(undefined)) return d.sendError(`:x: Invalid permission provided in \`$getBotInvite\``) 
            
            return d.deflate(await d.client.generateInvite({
                permissions: perms
            }))
        } else {
            return d.deflate(await d.client.generateInvite())
        }
    }
})