const spawn = require('child_process').spawn;

module.exports = {
    name: "$reboot",
    description: "restarts bot process",
    execute: async d => {
        (function main() {
            if (process.env.process_restarting) {
                delete process.env.process_restarting
                setTimeout(main, 1000)
                return
            }

            spawn(process.argv[0], process.argv.slice(1), {
                env: { process_restarting: 1 },
                stdio: 'ignore'
            }).unref();
            
            d.client.destroy() 
        })()
    }
}