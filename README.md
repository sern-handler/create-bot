# @sern/create-bot

## Scaffolding sern projects

With NPM:

```bash
$ npm create @sern/bot
```

With Yarn:

```bash
$ yarn create @sern/bot
```

With PNPM:

```bash
$ pnpm create @sern/bot
```

Then follow the prompts!

You can also directly specify the project name and the template you want to use via additional command line options. For example, to scaffold a Typescript project, run:

```bash
# npm 6.x
npm create @sern/bot --template=ts-esm --name="mybot"

# npm 7+, extra double-dash is needed:
npm create @sern/bot -- --template=ts-esm --name="mybot"

# !!!!POWERSHELL SYNTAX
npm create @sern/bot '--' --template=ts-esm --name="mybot"

# yarn
yarn create @sern/bot --template=ts-esm --name="mybot"

# pnpm
pnpm create @sern/bot --template=ts-esm --name="mybot"
```

Currently supported template presets include:

- `ts`
- `ts-esm`
- `js`
- `js-esm`
