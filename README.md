# d.js-BDscript #
## REQUIRES NODEJS VERSION 14 OR EARLIER ##
---------------------------------
Want to use beta version of the package? Use `npm i https://github.com/Rubenennj/d.js-BDscript` to install upcoming updates.

Inspired in [Bot Designer For Discord](https://discord.gg/bot)

Need help? Or hang out with other users who use this package? Then don't hesitate to join [here](https://discord.gg/G2DEf4TV)!

# Base for a d.js-BDscript bot #
---------------------------------

```js
const bdjs = require("d.js-bdscript")

const bot = new bdjs({
    token: "token here", //bot token
    prefix: "!" //accepts an array of prefixes too 
})

bot.command({
    type: "command", //the command type, "command" stands for message event commands
    name: "say", //command trigger
    code: "$message"
})

bot.addEvent("onMessage") //add message callback

bot.login() //logs the bot on discord
```

# Creating Variables # 
---------------------------------

<strong> To create a variable, we have to use `<Bot>.variable()` which accepts an array, or object. Each variable has to have a name and type, value is optional. </strong> 

## Method 1: ##
```js 
bot.variable({
    name: "money",
    value: 0,
    type: "integer"
})
```

## Method 2: ##
```js 
bot.variable({
    money: {
        value: 0,
        type: "integer"
    }
})
```

## Method 3: ##
```js 
bot.variable([
    {
        name: "money",
        value: 0,
        type: "integer"
    }
])
```


