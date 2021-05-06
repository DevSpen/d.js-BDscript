module.exports = {
    name: "$sub",
    brackets: true, 
    description: "subtract numbers from others",
    fields: [{
        name: "numbers",
        description: "number or numbers to substract, separated by `;`",
        type: "number"
    }],
    returns: "?number",
    execute: async d => {
        const numbers = await d.resolveArray()
        
        if (numbers === undefined) return 
        
        return d.deflate(numbers.reduce((x, y) => Number(x) - Number(y)))
    }
}