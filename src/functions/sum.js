module.exports = {
    name: "$sum",
    brackets: true, 
    fields: [{
        name: "numbers",
        description: "number or numbers to add, separated by `;`",
        type: "number"
    }],
    execute: async d => {
        const numbers = await d.resolveArray()
        
        if (numbers === undefined) return 
        
        return d.deflate(numbers.reduce((x, y) => Number(x) + Number(y), 0))
    }
}