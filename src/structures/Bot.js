const Discord = require("discord.js")
const Commands = require("../utils/commands")
const Listeners = require("../utils/events")
const SQL = require("sqlite_master.db")
const DiscordUtil = require("../utils/discord")
const ResolveAPIMessage = require("../main/resolveAPIMessage")
const interpreter = require("../main/interpreter")
const Parser = require("../main/parser")
const Compile = require("../main/compiler")

require("../prototypes/Strings")
require("../prototypes/Objects")
require("../prototypes/Arrays")

module.exports = class Bot {
    constructor(options = {}) {
        this.client = new Discord.Client({
            partials: ["GUILD_MEMBER", "CHANNEL", "MESSAGE", "USER", "REACTION"]
        })
        
        this.commands = new Discord.Collection() 
        
        Object.defineProperty(this.client, "bot", {
            writable: false,
            value: this 
        })
        
        Object.defineProperty(this, "compile", {
            writable: false,
            value: Compile
        })
        
        Object.defineProperty(this, "resolveAPIMessage", {
            writable: false,
            value: ResolveAPIMessage
        })
        
        Object.defineProperty(this, "interpreter", {
            writable: false,
            value: (data, rCode, pointer) => interpreter(this.client, data, rCode, pointer)
        })
        
        Object.defineProperty(this, "parser", {
            writable: false,
            value: Parser() 
        })
        
        Object.defineProperty(this, "variables", {
            value: [] 
        })
        
        options = this._resolve(options) 
        
        this.options = options 
        
        Object.defineProperty(this, "db", {
            writable: true,
            value: new SQL.Database({
                path: this.options.databasePath || "./db.sqlite"
            })
        })
    }
    
    variable(varOrVars) {
        if (Array.isArray(varOrVars)) {
            return varOrVars.map(v => this.variables.push(this.resolveVar(v))) 
        } else {
            if (varOrVars.name) {
                return this.variables.push(this.resolveVar(varOrVars)) 
            } else for (const [name, { type, value }] of Object.entries(varOrVars)) {
                this.variables.push(this.resolveVar({
                    name, type, value
                }))
            }
        }
    }
    
    resolveVar(data) {
        return {
            name: data.name,
            type: data.type === "string" ? "text" : data.type,
            defaultValue: data.value 
        }
    }
    
    get MentionRegExp() {
        return new RegExp(`^<@!?${this.client.user?.id}>`)
    }
    
    _resolve(options) {
        if (!options.prefix) throw new Error("Prefix was not given.")
        
        options.prefix = Array.isArray(options.prefix) ? options.prefix : [options.prefix]
        
        for (let i = 0;i < options.prefix.length;i++) {
            const p = options.prefix[i]
            if (p.includes("$")) {
                options.prefix[i] = Compile(this.client, p)
            } else options.prefix[i] = p 
        }
        
        if (options.intents) options.intents = DiscordUtil.Intents(options.intents).bits 
        else options.intents = Discord.Intents.ALL 
        
        return options 
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
        
        opts.compiledName = Compile(this.client, opts.name ?? opts.channel ?? "") 
        
        opts.compiled = Compile(this.client, opts.code)
        
        this.commands.get(opts.type).set(opts.id, opts)
    }
    
    login(token) {
        if (this.variables.length) {
            this.variables.unshift({
                name: "type",
                defaultValue: "", 
                type: "text"
            })
            
            this.db.createTable({
                name: "main",
                rows: this.variables
            })
        }
        
        this.db.once("ready", () => {
            console.log("Database ready!")
            this.client.once("ready", () => {
                console.log("Client ready!")
            })
            this.client.login(this.options.token || token)
        })
        this.db.connect()
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