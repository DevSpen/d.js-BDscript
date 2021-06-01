module.exports = {
    name: "$toLocaleUppercase",
    brackets: true,
    description: "turns first letter of provided words uppercase",
    fields: [{
        name: "text",
        type: "string",
        description: "the text to convert"
    }],
    returns: "string",
    execute: async d => {
        const text = await d.resolveAll()
            
        if (typeof text === "undefined") return undefined
            
        return d.deflate(text.trim().split(/ +/g).goof(" ").join(" "))
    } 
}