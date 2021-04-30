module.exports = {
    name: "$divide",
    description: "divides numbers",
    fields: [{
        name: "numbers",
        description: "number or numbers to divide, separated by `;`",
        type: "number"
    }],
    returns: "number", 
    brackets: true, 
    execute: async d => {
        const numbers = await d.resolveArray()
        
        if (numbers === undefined) return 
        
        return d.deflate(numbers.reduce((x, y) => Number(x) / Number(y), 0))
    }
}