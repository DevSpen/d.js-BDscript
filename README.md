# Uses my newly top down parser #
---------------------------------
Install using `npm i https://github.com/Rubenennj/d.js-BDscript`

Inspired in [Bot Designer For Discord](https://discord.gg/bot)

```js
const bdjs = require("soon")

const bot = new bdjs({
    token: "token here", //bot token
    prefix: "!" //accepts an array of prefixes too 
})

bot.command({
    type: "command", //the command type, "command" stands for message event commands
    name: "say", //command trigger
    code: "$message"
})

bot.readyEvent() //this will just notify us when the client is ready

bot.onMessage() //message callback

bot.login() //logs the bot on discord
```