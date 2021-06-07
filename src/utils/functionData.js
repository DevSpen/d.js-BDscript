const data = require("../main/data");

module.exports = {
    name: new String(),
    description: new String(),
    disabled: new Boolean(), 
    fields: [
        {
            name: new String(),
            required: new Boolean(),
            default: null,
            type: new String(),
            description: new String()
        }
    ],
    returns: new String(),
    brackets: new Boolean(),
    optional: new Boolean(),
    requires: new Array(),
    execute: async (d = data) => Object
}