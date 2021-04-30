module.exports = {
    name: "$random",
    returns: "number",
    fields: [{
        name: "min",
        description: "the min value that can be returned",
        type: "number"
    }, {
        name: "max",
        description: "the max value that can be returned",
        type: "number"
    }],
    description: "returns a random number between min and max",
    brackets: true,
    execute: async d => {
        let [min, max, decimals = false] = (await d.resolveArray()) || []
        
        if (min === undefined) return undefined
        
        min = Number(min), max = Number(max)
        
        if (isNaN(min) || isNaN(max)) return d.sendError(":x: Invalid number in \`$random\`")
        
        const path = `${min};${max}`
        
        const val = d.container.randoms[path] || Math.random() * (max - min) + min 
        
        d.container.randoms[path] = val 
        
        return d.deflate(decimals === "yes" ? val : Math.floor(val))
    }
}