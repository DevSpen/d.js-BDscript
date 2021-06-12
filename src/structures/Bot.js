const Discord = require("discord.js")
const Commands = require("../utils/commands")
const CommandManager = require("./CommandManager")
const Listeners = require("../utils/events")
const BotOptions = require("../utils/botOptions")
const SQL = require("sqlite_master.db")
const DiscordUtil = require("../utils/discord")
const ResolveAPIMessage = require("../main/resolveAPIMessage")
const interpreter = require("../main/interpreter")
const Parser = require("../main/parser")
const Compile = require("../main/compiler")
const parse = require("parse-ms")
const StatusManager = require("./StatusManager")
const commandData = require("../utils/commandData")
const { CommandData, CommandTypes, DefaultBotOptions } = require("../utils/Constants")
const GuildAudioPlayer = require("./AudioPlayer")

require("../prototypes/Strings")
require("../prototypes/Objects")
require("../prototypes/Arrays")

module.exports = class Bot {
    /**
     * The bot instance.
     * @param {DefaultBotOptions} options options to pass to the client.
     */
    constructor(options = {}) {
        if (!options.client) options.client = {}

        options.client.partials = ["USER", "MESSAGE", "CHANNEL", "REACTION", "GUILD_MEMBER"]
                
        options = this._resolve(options) 
        
        this.client = new Discord.Client(options.client)
        
        this.intervals = new Discord.Collection()
        
        this.commands = new Discord.Collection() 
        
        this.slash_commands_data = new Discord.Collection()

        this.manager = new CommandManager(this)

        Object.defineProperty(this, "custom_functions", { value: new Discord.Collection() })
        
        Object.defineProperty(this, "listeners", { value: [] })

        /**
         * Players for ytdl.
         * @type {Discord.Collection<string, GuildAudioPlayer>}
         */
        this.ytdl_servers = new Discord.Collection()
        
        Object.defineProperty(this, "ytdl_cache", {
            writable: false,
            value: new Discord.Collection()
        })
        
        Object.defineProperty(this, "lavalink_servers", {
            writable: false,
            value: new Discord.Collection()
        })
        
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

        Object.defineProperty(this, "status", {
            writable: false,
            value: new StatusManager(this)
        })
        
        Object.defineProperty(this, "variables", {
            value: [] 
        })

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
    
    createSlashCommandData(opts = new Discord.ApplicationCommand()) {
        return this.slash_commands_data.set(opts.name, opts)
    }

    parse(ms) {
        if (typeof ms !== "number") {
            return undefined
        }
        
        if (ms < 1000) {
            return "1 second"
        }
        
        return Object.entries(parse(ms)).map((a, y) => {
            if (a[1] && y < 4) return `${a[1]} ${a[0]}`
            else return undefined
        }).filter(a => a).join(" ")
    }
    
    _resolve(options) {
        if (!options.prefix || !options.prefix.length) throw new Error("Prefix was not given.")
        
        options.prefix = Array.isArray(options.prefix) ? options.prefix : [options.prefix]
        
        for (let i = 0;i < options.prefix.length;i++) {
            const p = options.prefix[i]
            if (p.includes("$")) {
                options.prefix[i] = Compile(this.client, p)
            } else options.prefix[i] = p 
        }
        
        if (!options.intents) {
            throw new Error("Intents must be passed to bot options, check /intents for more info (discord)")
        } else {
            if (typeof options.intents === "string") {
                if (options.intents === "all") {
                    options.client.intents = Discord.Intents.ALL
                } else if (options.intents === "non_privileged") {
                    options.client.intents = Discord.Intents.NON_PRIVILEGED
                } else {
                    throw new Error(`Valid Intents must be passed to bot options, check /intents for more info (discord)`)
                }
            } else {
                const ints = DiscordUtil.INTENTS_FLAGS()
                options.client.intents = options.intents.map(i => ints[i])
                if (options.client.intents.includes(undefined)) {
                    throw new Error(`Invalid intents passed to bot.`)
                }
            }   
        }

        return options 
    }
    
    /**
     * @private
     */
    snowflake(id) {
        return `(${id})`
    }
    
    /**
     * Creates a function that can be called in a code through $callFunction.
     * @param {string} name the function name.
     * @param {string} code the code to call.
     */
    createFunction(name, code) {
        this.custom_functions.set(name, code)
    }

    /**
     * 
     * @param {...CommandData} options the options for this command.
     */
    command(...options) {
        for (const opts of options) {
            if (Array.isArray(opts)) {
                for (const opt of opts) {
                    this.command(opt)
                }
                continue
            }

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
    }
    
    /**
     * Connects the client to discord.
     * @param {string?} token the token to use to validate the websocket connection to discord.
     */
    login(token) {
        this.db.createTable({
            name: "cooldowns",
            rows: [{
                name: "startedAt",
                type: "integer",
                defaultValue: 0
            }, {
                name: "type",
                type: "string",
                defaultValue: ""
            }, {
                name: "time",
                type: "integer",
                defaultValue: 0 
            }]
        })
        
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
                this.status.start() 
            })
            this.client.login(this.options.token || token)
        })
        this.db.connect()
    }
    
    /**
     * add multiple events to client.
     * @param {string[]} events events to add to client.
     */
    addEvents(events = []) {
        return this.addEvent(events)
    }

    /**
     * Add event listeners to the client.
     * @param {string|string[]} eventOrEvents events to enable on this client. 
     */
    addEvent(eventOrEvents = []) {
        if (typeof eventOrEvents === "string") {
            const event = Listeners[eventOrEvents]
                
            if (!event) throw new Error(`Event ${eventOrEvents} does not exist!`)
                
            if (this.listeners.includes(eventOrEvents)) {
                console.warn(`Event ${eventOrEvents} was already added.`)
            }

            this.listeners.push(eventOrEvents)
            
            event[1](this.client)
            
            this.client.incrementMaxListeners()
        } else {
            for (const name of eventOrEvents) {
                const event = Listeners[name]
                
                if (!event) throw new Error(`Event ${name} does not exist!`)
                
                if (this.listeners.includes(name)) {
                    console.warn(`Event ${name} was already added.`)
                    continue; 
                }

                this.listeners.push(name)

                event[1](this.client) 

                this.client.incrementMaxListeners()
            }
        }
    }

    /**
     * Creates a audio player.
     * @param {string} guildID the id to create.
     * @returns {GuildAudioPlayer}
     */
    createAudioPlayer(guildID) {
        if (this.ytdl_servers.has(guildID)) {
            return this.ytdl_servers.get(guildID)
        }
        const audio = new GuildAudioPlayer(this.client, guildID)
        this.ytdl_servers.set(guildID, audio)
        return audio
    }
}