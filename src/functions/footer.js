module.exports = {
    name: "$footer",
    brackets: true,
    execute: async d => {
        if (d.value.fields.length) {
            let [text, url] = d.value.inside.split(";")
            
            text = await d.resolveCode(text)
            url = await d.resolveCode(url) 
            
            if (typeof text === "undefined" || typeof url === "undefined") return undefined 
            
            d.container.embed.setFooter(text, url)
        } else {
            const [text, url] = d.value.inside.split(";")
            
            d.container.embed.setFooter(text, url) 
        }
        
        return d.deflate(d.value.id, "")
    }
}