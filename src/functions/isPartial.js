module.exports = {
    name: "$isPartial",
    description: "checks whether a structure is partial, returns nothing if structure does not exist.",
    fields: [{
        name: "structure",
        description: "the structure to check for, can be `message`, `member`, `reaction`, `user`, etc..."
    }],
    returns: "?boolean",
    brackets: true, 
    execute: async d => {
        const structure = await d.resolveAll()
        
        if (structure === undefined) return undefined
        
        if (structure === "message") return d.deflate(d.message?.partial ?? "")
        else if (structure === "reaction") return d.deflate(d.data?.[structure]?.partial ?? "")
        else return d.deflate(d.message?.[structure]?.partial ?? "")
    }
}