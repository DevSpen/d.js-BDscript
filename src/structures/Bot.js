const Discord = require("discord.js")
const Commands = require("../utils/commands")
const Listeners = require("../utils/events")

const interpreter = require("../main/interpreter")
const Parser = require("../main/parser")
const Compile = require("../main/compiler")

require("../prototypes/Strings")
require("../prototypes/Objects")
require("../prototypes/Arrays")

module.exports = class Bot {
    constructor(options = {}) {
        this.client = new Discord.Client(options.client)
        
        this.options = options 
        
        this.commands = new Discord.Collection() 
        
        Object.defineProperty(this.client, "bot", {
            writable: false,
            value: this 
        })
        
        Object.defineProperty(this, "compile", {
            writable: false,
            value: Compile
        })
        
        Object.defineProperty(this, "interpreter", {
            writable: false,
            value: (data, rCode) => interpreter(this.client, data, rCode)
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
        
        if (!this.commands.has(opts.type)) this.commands.set(opts.type, new Discord.Collection()) 
        
        opts.id = this.commands.get(opts.type).size
        
        opts.compiled = Compile(this.client, opts.code)
        
        this.commands.get(opts.type).set(opts.id, opts)
    }
    
    login(token) {
        this.client.login(token || this.options.token)
    }
    
    addEvent(eventOrEvents = []) {
        if (typeof eventOrEvents === "string") {
            const event = Listeners[eventOrEvents]
                
            if (!event) throw new Error(`Event ${eventOrEvents} does not exist!`)
                
            event[1](this.client) 
        } else {
            for (const name of eventOrEvents) {
                const event = Listeners[name]
                
                if (!event) throw new Error(`Event ${name} does not exist!`)
                
                event[1](this.client) 
            }
        }
    }
}