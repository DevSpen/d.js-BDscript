const functionData = require("../utils/functionData");

module.exports = class Function {
    /**
     * Creates a function with given data.
     * @param {import("../utils/Constants").FunctionData} data 
     */
    constructor(data = {}) {
        for (const [key, val] of Object.entries(data)) this[key] = val
    }
}