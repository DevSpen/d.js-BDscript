const Discord = require("discord.js")
const Commands = require("../utils/commands")
const interpreter = require("../main/interpreter")
const Parser = require("../main/parser")
const Compile = require("../main/compiler")

require("../prototypes/Objects")

module.exports = class Bot {
    constructor(options = {}) {
        this.client = new Discord.Client(options.client)
        
        this.options = options 
        
        this.commands = new Discord.Collection() 
        
        Object.defineProperty(this.client, "bot", {
            writable: false,
            value: this 
        })
        
        Object.defineProperty(this, "interpreter", {
            writable: false,
            value: (data) => interpreter(this.client, data)
        })
        
        Object.defineProperty(this, "parser", {
            writable: false,
            value: Parser() 
        })
    }
    
    readyEvent() {
        this.client.on("ready", () => {
            console.log(`Ready on client ${client.user.tag}`)
        })
    }
    
    snowflake(id) {
        return `(${id})`
    }
    
    command(opts = {}) {
        if (!opts.type) throw new Error(`Command is missing its type!`)
        
        const data = Commands[opts.type]
        
        if (!data) throw new Error(`Type '${opts.type}' is not a valid command type.`)
        
        for (const [property, required] of Object.entries(data)) {
            if (!opts[property] && required) throw new Error(`command.${property} is required for '${opts.type}' command!`)
        }
        
        if (!this.commands.has(opts.type)) this.commands[opts.type] = new Discord.Collection() 
        
        opts.id = this.commands[opts.type].size
        
        opts.compiled = Compile(this.client, opts.code)
        
        this.commands[opts.type].set(opts.id, opts)
    }
    
    login(token) {
        this.client.login(token || this.options.token)
    }
    
    //callbacks 
    onMessage() {
        this.client.on("message", (m) => require(`../events/message`)(this.client, m))
    }
}