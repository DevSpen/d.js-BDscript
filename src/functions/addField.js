module.exports = {
    name: "$addField",
    brackets: true,
    execute: async d => {
        const [name, value, inline = "no"] = (await d.resolveArray()) || []
        
        if (name === undefined) return undefined
        
        d.container.embed.addField(name, value, inline === "yes")
        
        return d.deflate()
    }
}