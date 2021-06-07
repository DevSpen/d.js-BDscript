const { MATH } = require("./regexes")

module.exports = (str) => {
    return str.replace(MATH, "")
}