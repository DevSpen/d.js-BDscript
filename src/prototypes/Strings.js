String.prototype.escape = function() {
    let text = this 
    
    for (const match of text.match(/\\(\W)/g) || []) {
        const letter = match[1]
        
        text = text.replace(`\\${letter}`, `%#{${letter.charCodeAt(0)}}#%`)
    }
    
    return String(text) 
}

String.prototype.unescape = function() {
    let text = this 
    
    for (const match of text.match(/%#{(\d{1,5})}#%/g) || []) {
        const code = match.match(/(\d+)/)[0]
        
        text = text.replace(`%#{${code}}#%`, String.fromCharCode(code))
    }
    
    return String(text) 
}