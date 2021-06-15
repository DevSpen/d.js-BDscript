# How To Contribute
Want to contribute to d.js-BDScript? Read this guide!

1: Make your code.

2: [Create a pull request](https://docs.github.com/en/github/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request).

3: Wait for your pull request to be reviewed.

4: Make changes, if they are requested.


## Base
### Without Any Fields
```js
module.exports = {
    name: "$functionName",
    returns: "...",
    description: "...",
    execute: async d => {
        //code here
    }
}
```

### With Fields
```js
module.exports = {
    name: "$functionName",
    brackets: true,
    optional: ...,
    description: "...",
    fields: [{
        name: "...",
        type: "...",
        description: "..."
    }, {
        name: "...",
        type: "...",
        description: "..."
    }],
    execute: async d => {
        //code here
    }
}
```

## Contributing Terms
- You may not be credited for the making of the function/feature. However, if acceptable the Developers reserve the right to give perks or recognition to users for contributing.
- The name of files must be in the format of `functionName.js`. No spaces or special characters.
- All pull requests must contain a name, description, and code.
- Do not make duplicates or useless pull requests.
- Do not make troll or NSFW pull requests.

## Tips
- Use `?` in `returns` property if the function can return an empty string.
- You can use `string`, `boolean`, `number`, `any`, `?string`, `?boolean`, `?number`, or `?any` for the `returns` property.
- The `description` should be short, but explain the function well.
- The `optional` property allows you to make the brackets (aka fields) optional. By inputting `true` all fields will be optional for the function. Default is `false`. 
- If you are a frequent contributor, you may get the Contributor role in our [Discord Server](https://dsc.gg/d.js-bdscript)!
- Use your resources! Look at existing codes, and the [discord.js documentation](https://discord.js.org/#/docs/main/master/general/welcome).
