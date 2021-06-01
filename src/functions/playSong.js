const player = require("../handlers/ytdlPlayer")

module.exports = {
    name: "$playSong",
    description: "plays a specific song or queues it",
    optional: ["ffmpeg-static", "fluent-ffmpeg", "@discordjs/opus"],
    requires: ["yt-seach", "ytdl-core", "ffmpeg", "opusscript", "ytfps"],
    returns: "?string",
    examples: [`//Playing by query
$playSong[$guildID;lovers on the sun;search]`, `//Playing by url
$playSong[$guildID;https://youtu.be/4FZKU8F_9-o;url]`, `//Adding playlist
$playSong[$guildID;https://youtube.com/playlist?list=PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10;playlist]`],
    fields: [{
        name: "guildID",
        description: "the guild to execute this in",
        type: "string"
    },{
        name: "song",
        description: "the song to play",
        type: "string"
    }, {
        name: "type",
        type: "string",
        description: "the type of the song query that was used, `search`, `url`, or `playlist`."
    }, {
        name: "returnStatus",
        description: "whether to return the current status for the song that was added, `true` for playing or `false` for queued",
        type: "boolean"
    }],
    brackets: true,
    execute: async d => {
        const [
            guildID,
            query,
            type = "url",
            status = "no"
        ] = (await d.resolveArray()) ?? []
        
        const cache = d.client.bot.ytdl_cache 
        
        if (guildID === undefined) return undefined
        
        const guild = d.client.guilds.cache.get(guildID)
        
        if (!guild) return d.sendError("guildID", guildID)
        
        if (!["url", "search", "playlist"].includes(type)) return d.sendError("query type", type)
        
        const voice = guild.me.voice 
        
        if (!voice.channelID) return d.sendError(":x: Failed to get voice connection")
        
        if (!voice.connection) {
            await voice.channel.join()
        }
        
        let data;
        
        if (type === "url") {
            const ytdl = require("ytdl-core")
            
            const song = cache.get(query) ?? await ytdl.getInfo(query).catch(err => null)
            
            if (!song) return d.sendError(":x: Failed to get song info")
            
            const video = song.videoDetails
            
            data = video ? {
                title: video.title,
                url: video.video_url,
                duration: Number(video.lengthSeconds),
                thumbnail: video.thumbnails?.[video.thumbnails?.length - 1]?.url,
                author: video.author?.name
            } : song 
            
            if (video) cache.set(query, data)
        } else if (type === "search") {
            const err = await new Promise((resolve, reject) => {
                if (cache.has(query)) {
                    const val = cache.get(query)
                    data = val 
                    return resolve(val)
                }
                
                setTimeout(() => {
                    reject("timeout")
                }, 10000);
                
                const { Worker } = require("worker_threads")
                
                const worker = new Worker(`
                const { parentPort } = require("worker_threads")
            
                const search = require("yt-search")
                parentPort.once("message", async (query) => {

                    try {
                        var videos = await search(query)
                    } catch (e) {
                        return parentPort.postMessage(e.message)
                    }
                    
                    const first = videos.videos[0]
                    
                    parentPort.postMessage({
                        title: first.title,
                        duration: first.seconds,
                        thumbnail: first.thumbnail,
                        url: first.url,
                        image: first.image,
                        author: first.author.name
                    })
                })
                `, {
                    eval: true
                })
                
                worker.once("error", (error) => {
                    reject(error)
                })
                
                worker.once("message", (d) => {
                    if (typeof d === "string") {
                        return reject(d)
                    } else {
                        cache.set(query, d)
                        data = d  
                        resolve(d)
                    }
                })
                
                worker.postMessage(query)
            }).catch(err => err)
            
            if (err.message) return d.sendError(":x: Request timed out! " + err.message)
        } else if (type === "playlist") {
            const ytfps = require("ytfps")
            
            const playlist = cache.get(query) ?? await ytfps(query).catch(err => null)
            
            if (!playlist) return d.sendError(`:x: No playlist found`)
            
            cache.set(query, playlist)
            
            data = playlist 
        }
        
        if (!data) return d.sendError(`:x: Could not find any video`)
        
        data.user = d.message?.author 
        
        const servers = d.client.bot.ytdl_servers
        
        let queued = true 
        
        if (!servers.get(guildID)?.songs.length) {
            queued = false 
            
            const srv = servers.get(guildID)
            
            const server = {
                songs: [],
                all_songs: [],
                loop: srv?.loop ?? 0,
                volume: srv?.volume ?? 100,
                status: "stopped",
                connection: voice.connection,
                vc: voice,
                text: d.message?.channel,
            }
            
            if (type === "playlist") {
                data.videos.map(video => {
                    const dat = {
                        url: video.url,
                        title: video.title,
                        duration: video.milis_length / 1000,
                        thumbnail: video.thumbnail_url,
                        user: d.message?.author,
                        author: video.author.name,
                    }
                    server.songs.push(dat)
                    server.all_songs.push(dat)
                })
            } else {
                server.songs.push(data)
                server.all_songs.push(data)
            }
            servers.set(guildID, server)
            
            await player(d.client, guild.id)
        } else {
            const server = servers.get(guild.id)
            
            server.songs.push(data)
            server.all_songs.push(data)
            
            servers.set(guild.id, server)
        }
        
        return d.deflate(status === "yes" ? !queued : "")
    }
}