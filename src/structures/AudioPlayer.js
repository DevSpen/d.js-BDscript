const { joinVoiceChannel, VoiceConnection, createAudioPlayer, AudioPlayer, PlayerSubscription, AudioPlayerStatus, getVoiceConnection, AudioResource } = require("@discordjs/voice")
const { Guild, Client, User } = require("discord.js")
const Track = require("./Track")

module.exports = class GuildAudioPlayer {
    /**
     * @param {Client} client the djs client.
     * @param {string} guildID the guild id.
     */
    constructor(client, guildID) {
        this.guildID = guildID
        /**
         * @type {Client}
         */
        this.client = client 
        
        /**
         * The subscription to the guild channel.
         * @type {PlayerSubscription}
         */
        this.subscription = null

        /**
         * The resource thats currently being played.
         * @type {AudioResource}
         */
        this.rest = null

        /**
         * @type {AudioPlayer}
         */
        this.player = createAudioPlayer()

        /**
         * @type {?VoiceConnection}
         */
        this.connection = null

        /**
         * Queue of songs.
         * @type {import("../utils/Constants").TrackData[]} the queue of tracks.
         */
        this.queue = []
    } 

    /**
     * @type {?VoiceConnection}
     */
    get voiceConnection() {
        if (!this.connection) this.connection = getVoiceConnection(this.guildID)
        
        if (!this.connection) throw new Error(`No voice connection found`)

        return this.connection
    }
    subscribe() {
        this.player.on("stateChange", (oldState, newState) => {
            if (newState.status === AudioPlayerStatus.Idle && oldState.status !== AudioPlayerStatus.Idle) {
                this.queue.shift()
                if (!this.queue.length) {
                    delete this.subscription
                    this.rest = null
                    this.connection.destroy()
                } else {
                    this.play(this.queue[0])
                }
            } else if (newState.status === AudioPlayerStatus.Playing) {
                this.rest = newState.resource 
            }
        })

        this.subscription = this.voiceConnection.subscribe(this.player)
    }

    /**
     * Plays a track, or adds it to the queue.
     * @param {Track} track track to play. 
     */
    async play(track) {  
        const resource = await track.createAudioResource()

        if (!this.subscription) this.subscribe()

        this.player.play(resource)
    }

    /**
     * The resource playing.
     * @type {AudioResource}
     */
    get resource() {
        return this.rest 
    }

    /**
     * Enqueue a track or multiple tracks. 
     * @param {User} user the user adding these songs.
     * @param {import("../utils/Constants").TrackData|import("../utils/Constants").TrackData[]} data the track or tracks to queue.
     * @returns {boolean}
     */
    enqueue(data, user) {
        const current = this.queue.length 

        if (Array.isArray(data)) {
            for (const t of data) {
                const track = new Track(t)

                track.setUser(user)

                this.queue.push(track)
            }
        } else {
            const track = new Track(data)
            track.setUser(user)

            this.queue.push(track)
        }

        if (current === 0) {
            this.play(this.queue[0])
            return false
        } else {
            return true 
        }
    }

    /**
     * @type {Guild}
     */
    get guild() {
        return this.client.guilds.cache.get(this.guildID)
    }

    /**
     * 
     * @param {string} id the id of the channel to join 
     * @returns {VoiceConnection} 
     */
    joinChannel(id) {
        const connection = joinVoiceChannel({
            channelId: id,
            guildId: this.guildID,
            adapterCreator: this.guild.voiceAdapterCreator 
        })

        this.voiceConnection = connection

        return connection
    }
}