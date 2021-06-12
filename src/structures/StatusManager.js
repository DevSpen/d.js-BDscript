const Bot = require("./Bot")

module.exports = class StatusManager {
    /**
     * Creates a status manager.
     * @param {Bot} bot the client this manager will refer to.
     */
    constructor(bot) {
        /**
         * The bot this manager is attached to.
         * @type {Bot}
         */
        this.bot = bot

        /**
         * Current status.
         * @type {number}
         */
        this.current = 0
        
        /**
         * Array of statuses to cycle through.
         * @type {import("../utils/Constants").StatusData[]}
         */
        this.statuses = []
    }
    
    /**
     * Cycles over given statuses.
     */
    async start() {
        if (!this.statuses.length) return undefined
        
        const status = this.statuses[this.current] ?? this.statuses[0]
        
        if (!this.statuses[this.current]) this.current = 0 
        
        const resolved = await this.bot.interpreter({
            message: {},
            args: [],
            command: {
                name: "status",
                compiled: status.name 
            }
        }, true)
        
        this.bot.client.user.setPresence({
            status: status.presence ?? status.status,
            idle: status.idle,
            activities: [{
                name: resolved?.code,
                type: status.type?.toUpperCase?.(),
                url: status.url
            }]
        })
        
        this.current++
        
        await new Promise(e => setTimeout(e, (status.time ?? status.duration) || 12000))
        this.start() 
    }
    
    /**
     * Add an status or multiple statuses.
     * @param  {...import("../utils/Constants").StatusData} data the status data. 
     */
    add(...data) {
        data.map(d => {
            if (Array.isArray(d)) {
                d.map(d => {
                    d.name = this.bot.compile(this.bot.client, d.name)
                    this.statuses.push(d)
                }) 
            }
            else {
                d.name = this.bot.compile(this.bot.client, d.name)
                this.statuses.push(d)
            }
        })
    }
}