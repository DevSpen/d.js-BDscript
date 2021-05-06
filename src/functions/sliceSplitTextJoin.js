module.exports = {
    name: "$sliceSplitTextJoin",
    brackets: true,
    description: "slices and joins $textSplit elements with given separator",
    returns: "?string",
    fields: [{
        name: "start",
        description: "index to start getting elements at",
        type: "number"
    }, {
        name: "end",
        description: "index to stop getting elements, can be left empty or -1 to get all elements after `start`",
        type: "number"
    }, {
        name: "separator",
        type: "string",
        description: "the separator for each element"
    }],
    execute: async d => {
        const [start, end, separator = ", "] = (await d.resolveArray()) ?? []
        
        if (start === undefined) return undefined
        
        return d.deflate(d.container.splits.slice(Number(start) || 0, Number(end) === -1 ? d.container.splits.length : Number(end) || d.container.splits.length).join(separator))
    }
}