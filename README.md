# D.js-BDscript #
## REQUIRES NODEJS VERSION 14 OR EARLIER ##
---------------------------------
Want to use beta version of the package? Use `npm i https://github.com/Rubenennj/d.js-BDscript` to install upcoming updates.

Inspired in [Bot Designer For Discord](https://discord.gg/bot)

Need help? Or hang out with other users who use this package? Then don't hesitate to join [here](https://discord.gg/ezcdhQ8n)!

# Base for a D.js-BDscript bot #
---------------------------------

```js
const bdjs = require("d.js-bdscript")

const { EventTypes, CommandTypes } = require("d.js-bdscript/src/utils/Constants")

const bot = new bdjs({
    token: "token here", //bot token
    intents: "all", //intents (array) to enable for the bot, check /intents for all intents. (discord)
    prefix: "!" //accepts an array of prefixes too 
})

bot.command({
    type: CommandTypes.command, //the command type, CommandTypes.command (behaves same as "command") stands for message event commands
    name: "say", //command trigger
    code: "$message"
})

bot.addEvent([
    EventTypes.onMessage //behaves same as "onMessage"
]) //add message callback

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
bot.variable([
    {
        name: "money",
        value: 0,
        type: "integer"
    }
])
```

# Music (Deprecated) # 
---------------------------------
Yes, you heard it right! We have added music functions for you to make a good use of voice channels.
We only support ytdl-core currently but will soon have lavalink support!
To start off you need to install these dependencies as music dependencies are not pre-installed to keep the package clean.

```
npm i ytdl-core ffmpeg yt-search ytfps opusscript
```

You can optionally install `@discordjs/opus` and `ffmpeg-static` for better experience.

Here is a small example of how you would play a song through youtube search (query):
```js
Bot.command({
    type: "command",
    name: "play",
    code: `
    $onlyIf[$voiceID!=;Please join a voice channel first!]
    $joinVoice[$voiceID]
    $playSong[$guildID;$message;search]
    $if[$queueLength==1;
        Playing now $songInfo[title]!
    ;
        Successfully queued $songInfo[title;$queueLength]!
    ]`
})
```

# Slash Commands #
---------------------------------
We also support slash commands as of 5.0.0 
To make slash commands, you first need to define its info through `Bot.createSlashCommandData()`.
```js
Bot.createSlashCommandData({
    name: "test",
    description: "a simple slash command",
    options: [
        {
            name: "message",
            description: "something you can say",
            type: "STRING",
            required: true
        }, 
        {
            name: "target",
            description: "the person to mention",
            type: "USER",
            required: false 
        }
    ]
})
```
This will not do anything but define the data for the slash command `test`, we now have to add it to a guild or globally to every guild:
```js
//for global
Bot.command({
    type: "readyCommand", 
    code: `$createSlashCommand[global;test]` // last field is the name of our slash command
})

//for guild specific
Bot.command({
    type: "readyCommand",
    code: `$createSlashCommand[844681827015720991;test]` // first field is the ID of the guild to add this slash command to
})
```
And that's, you've now created a slash command, but how to reply to it? Easy!
```js
Bot.addEvent("onInteraction") //enables both slash commands and button interactions

Bot.command({
    type: "slashCommand",
    name: "test", // the name of our slash command
    code: `
    $reply 
    $title[$username said:]
    $description[$slashOption[message]]
    `
})
```
Notice how we put $reply, this is so the command replies to the interaction instead of of just making a response, which would make this interaction fail even though the bot would've responded.

# Buttons #
---------------------------------
We support buttons as of 5.0.0
To add buttons to a message, you only need to use $addActionRow / $addButton:
```js
Bot.command({
    type: "command",
    name: "buttons",
    code: `
    $addActionRow
    $addButton[button1;Click Me!;primary]
    $addButton[button2;Or Me!;secondary]
    Buttons! :3
    ` 
})
```
Yeah, that is about it, but now how do we interact with them? Very easy:
```js
Bot.addEvent("onInteraction") // enables both slash command and button interactions

Bot.command({
    type: "buttonCommand",
    code: `$reply <@$authorID> clicked button with ID $customID!`
})
```
And that is everything you need to know about buttons!