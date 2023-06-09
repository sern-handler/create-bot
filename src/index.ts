import { greenBright, red, redBright } from 'colorette';
import prompt, { PromptObject } from 'prompts';
import minimist from 'minimist'
import { writeFile } from 'fs/promises'
import path from 'path'
import fs from 'fs'
const argv = minimist<{
  template?: string
}>(process.argv.slice(2));

const cwd = process.cwd();
const templateChoices = [
    {
        title: 'typescript'
    },
    {
        title: 'typescript-esm'
    },
    {
        title: 'javascript'
    },
    {
        title: 'javascript-esm'
    },
];
const template: PromptObject = {
    message: 'Choose template',
    name: 'template',
    type: 'select',
    choices: templateChoices.map(t => ({ title: t.title, value: t.title }) )
};
const name: PromptObject = {
    message: 'What is your project name?',
    name: 'name',
    type: 'text',
    validate: (name: string) =>
	name.match('^(?:@[a-z0-9-*~][a-z0-9-*._~]*/)?[a-z0-9-~][a-z0-9-._~]*$')
	    ? true
	    : 'Invalid name',
};


async function runInteractive() {
  const result: prompt.Answers<'template'|'name'> = await prompt([
      template,
      name,
  ],
      {
        onCancel: () => {
          throw new Error(red('✖') + ' Operation cancelled')
        },
      },
  );
  const root = path.join(cwd, result.name);

  
  let overwrite = false;
  if (overwrite) {
    emptyDir(root)
  } else if (!fs.existsSync(root)) {
    fs.mkdirSync(root, { recursive: true })
  }
  //determine template
  const isTypescript = (result.template as string).includes('typescript');
  
  const configJson = {
      language : isTypescript ? 'typescript' : 'javascript', 
      paths: {
        base: 'src',
        cmds_dir: 'commands'
      },
  };
  //console.log(greenBright('Writing sern.config.json to '+  result.name + "/sern.config.json"));
  
//  try{
//    await writeFile(path.join(cwd, result.name, 'sern.config.json'), JSON.stringify(configJson), 'utf8');
//  } catch(E) {
//    console.error(redBright(E));
//    process.exit(1);
//  };

}


async function runShort() {
}

async function init() {
    console.log(`Working in: `+ cwd);
    
    if(!argv.template) {
        await runInteractive();
    } else {
        await runShort();
    }
}

function emptyDir(dir: string) {
  if (!fs.existsSync(dir)) {
    return
  }
  for (const file of fs.readdirSync(dir)) {
    if (file === '.git') {
      continue
    }
    fs.rmSync(path.resolve(dir, file), { recursive: true, force: true })
  }
}

init()

