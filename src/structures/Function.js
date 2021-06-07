const functionData = require("../utils/functionData");

module.exports = class Function {
    constructor(data = functionData) {
        for (const [key, val] of Object.entries(data)) this[key] = val
    }
}