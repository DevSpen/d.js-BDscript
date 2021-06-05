module.exports = {
    name: "$isMessageTTS",
    returns: "?boolean",
    description: "Whether or not the author's message was Text-To-Speech.",
    execute: async d => {
        return d.deflate(d.message?.tts || "")
    }
}
