const { createAudioResource, StreamType, AudioResource } = require("@discordjs/voice")
const { User } = require("discord.js")
const ytdl = require("ytdl-core-discord")

module.exports = class Track {
    /**
     * 
     * @param {import("../utils/Constants").TrackData} data the data for this track.
     * @param {object} addons the extras for this data.
     */
    constructor(data, addons) {
        this.data = data 
    }

    /**
     * return the user.
     * @type {User}
     */
    get user() {
        this.data.user
    }

    /**
     * Creates a readable source.
     * @returns {Promise<AudioResource<Track>>} 
     */
    async createAudioResource() {
        return createAudioResource(await ytdl(this.data.url), {
            metadata: this,
            inputType: StreamType.Opus
        })
    }

    /**
     * the length of the song in ms.
     * @type {number}
     */
    get length() {
        return (this.data.duration) * 1000
    }

    /**
     * Set a track to an user.
     * @param {User} user the user to set this track to. 
     * @public
     */
    setUser(user) {
        this.data.user = user
    }
}