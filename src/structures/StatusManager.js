module.exports = class StatusManager {
    constructor(bot) {
        this.bot = bot
        this.current = 0 
        this.statuses = []
    }
    
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
            activity: {
                name: resolved?.code,
                type: status.type?.toUpperCase?.(),
                url: status.url
            }
        })
        
        this.current++
        
        await new Promise(e => setTimeout(e, (status.time ?? status.duration) || 12000))
        this.start() 
    }
    
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