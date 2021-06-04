const characters = ("qwertyuiopasdfghjklzmxncbv" + ("qwertyuiopasdfghjklzmxncbv").toUpperCase()).split("")

module.exports.characters = characters

module.exports.generate = (n) => {
    n = Number(n) || 10

    let str = ""

    while (n--) {
        str += characters[Math.floor(Math.random() * characters.length)]
    }

    return str 
}