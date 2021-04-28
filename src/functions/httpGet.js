const axios = require("axios")

module.exports = {
    name: "$httpGet",
    brackets: true,
    execute: async d => {
        let [
            url,
            property,
            error,
            ...headers //unused
        ] = d.value.splits
        
        url = await d.resolveCode(url)
        
        property = await d.resolveCode(property)
        
        if (property === undefined || url === undefined) return undefined
        
        const request = await axios.get(url).catch(err => err)
        
        if (request.isAxiosError) {
            d.container.http = request 
            d.container.pointTo = "http"
            
            const fields = d.fieldsIn(error) 
            return d.deflate(d.value.id, "", fields, error)
        }
        
        const val = eval(`request.data.${property}`) ?? ""
        
        return d.deflate(typeof val === "object" ? require("util").inspect(val) : val)
    }
}