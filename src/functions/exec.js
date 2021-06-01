const exec = require("child_process").execSync 

module.exports = {
    name: "$exec",
    description: "executes a command in the powershell.",
    fields: [{
        name: "command",
        type: "string",
        description: "the command line to execute"
    }],
    returns: "?string",
    brackets: true,
    execute: async d => {
        const data = await d.resolveAll() 
        
        if (data === undefined) return 
        
        try {
            var code = await exec(data)
        } catch (e) {
            code = e.message
        }
        
        return d.deflate(code)
    }
}