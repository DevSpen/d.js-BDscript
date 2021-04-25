module.exports = {
    name: "$sum",
    brackets: true, 
    execute: async d => {
        const { value } = d 
        
        if (value.fields.length) {
            value.inside = await d.resolveAll()
            
            if (!value.inside) return undefined 
            
            return d.deflate(value.id, value.inside.split(";").reduce((x, y) => Number(x) + Number(y), 0)) 
        } else {
            return d.deflate(value.id, value.inside.split(";").reduce((x, y) => Number(x) + Number(y), 0)) 
        }
    }
}