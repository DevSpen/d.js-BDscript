const fs = require("fs")

module.exports = class CommandManager {
    constructor(bot) {
        this.bot = bot 
    }
    
    refresh(debug) {
        if (!this.path) return false 
        else {
            this.bot.commands.map((c, key) => c.map((command, id) => {
                if (command.managed === true) {
                    this.bot.commands.get(key).delete(id)
                }
            }))
            this.load(this.path, debug, true)
            return true 
        }
    }
    
    load(path = "./commands/", debug = false, override) {
        if (this.path && !override) return this.refresh(debug)
        this.path = path 
        
        if (path[0] === ".") path = path.slice(1)
        
        if (!path.endsWith("/")) path += "/"
        
        if (!path.startsWith("/")) path = "/" + path 
        
        const dotPath = `.${path}`
        
        if (debug) console.log(`Accessing ${dotPath}...`)
        
        for (const file of fs.readdirSync(dotPath)) {
            if (fs.lstatSync(dotPath + file).isDirectory()) {
                this.load(dotPath + file, debug)
                continue 
            }
            
            const filePath = `${this.constructor.root}${process.cwd()}${path}${file}`
            
            delete require.cache[require.resolve(filePath)]
            
            const data = require(filePath)
            
            data.managed = true 
            
            this.add(data)
            
            if (debug) console.log(`Loaded ${file} type ${data.type} located at ${dotPath}`)
        }
    }
    
    add(data) {
        this.bot.command(data) 
    }
    
    static get root() {
        return "../".repeat(10) 
    }
}