module.exports = {
    name: "$modulo",
    brackets: true, 
    description: "returns remainder between numbers",
    returns: "?number",
    fields: [{
        name: "numbers",
        type: "number",
        description: "the numbers to get their remainders from, separated by `;`"
    }],
    execute: async d => {
        const numbers = await d.resolveArray()
        
        if (numbers === undefined) return 
        
        return d.deflate(numbers.reduce((x, y) => Number(x) % Number(y)))
    }
}