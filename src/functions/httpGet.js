const axios = require("axios")

module.exports = {
    name: "$httpGet",
    brackets: true,
    returns: "?string",
    description: "performs an http GET method to given url",
    fields: [{
        name: "url",
        type: "string",
        description: "the api/website url"
    }, {
        name: "property",
        type: "string",
        description: "the property to get from the response"
    }, {
        name: "error",
        type: "string",
        description: "code to execute if the request fails, $data will contain an Axios error object that you can use to get more info on the error"
    }],
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
        
        const request = d.container.requests?.[url] || await axios.get(url).catch(err => err)
        
        d.container.requests[url] = request 
        
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