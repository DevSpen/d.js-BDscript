Array.prototype.goof = function(separator = "_") {
    return this.map(words => words.split(separator).map(word => word[0].toUpperCase() + word.slice(1).toLowerCase()).join(" ")) 
}