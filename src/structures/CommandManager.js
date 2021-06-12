const fs = require("fs")
const Bot = require("./Bot")

module.exports = class CommandManager {
    /**
     * Instantiates a command manager.
     * @param {Bot} bot the bot this manager belongs to.
     */
    constructor(bot) {
        /**
         * The bot this manager refers to.
         * @type {Bot}
         */
        this.bot = bot 
    }
    
    /**
     * Refreshes the commands.
     * @param {boolean} debug whether to log commands and directories that are loaded.
     * @param {boolean} experimental unused
     * @returns {boolean}
     */
    refresh(debug, experimental) {
        if (!this.path) return false 
        else {
            this.bot.commands.map((c, key) => c.map((command, id) => {
                if (command.managed === true) {
                    this.bot.commands.get(key).delete(id)
                }
            }))
            this.load(this.path, debug, true, experimental)
            return true 
        }
    }
    
    /**
     * loads all commands in a directory.
     * @param {string} path the path to load commands from.  
     * @param {boolean} debug whether to log debug data.  
     * @param {boolean} override unused.
     * @param {boolean} experimental unused.
     * @returns 
     */
    load(path = "./commands/", debug = false, override, experimental = false) {
        if (this.path && !override) return this.refresh(debug)
        this.path = path 
        
        if (path[0] === ".") path = path.slice(1)
        
        if (!path.endsWith("/")) path += "/"
        
        if (!path.startsWith("/")) path = "/" + path 
        
        const dotPath = `.${path}`
        
        if (debug) console.log(`Accessing ${dotPath}...`)

        for (const file of fs.readdirSync(dotPath)) {
            if (fs.lstatSync(dotPath + file).isDirectory()) {
                this.load(dotPath + file, debug, true, experimental)
                continue 
            }
            
            const filePath = `../../../../${path}${file}`
            
            delete require.cache[require.resolve(filePath)]
            
            const data = require(filePath)
            
            data.managed = true 
            
            this.add(data)
            
            if (debug) console.log(`Loaded ${file} type ${data.type} located at ${dotPath}`)
        }
    }
    
    /**
     * Adds a command to bot.
     * @param {import("../utils/Constants").CommandData|import("../utils/Constants").CommandData[]} data the command data. 
     */
    add(data) {
        this.bot.command(data) 
    }
    
    /**
     * @private
     */
    static get root() {
        return "../".repeat(10) 
    }
}