import { greenBright, magentaBright, red } from 'colorette';
import prompt, { PromptObject } from 'prompts';
import minimist from 'minimist';
import path from 'path';
import fs from 'fs';
import assert from 'node:assert';
import { spawn } from 'node:child_process'
const argv = minimist<{
  template?: string;
  name?: string;
  overwrite?: boolean;
  install?: 'pnpm' | 'yarn' | 'npm'
}>(process.argv.slice(2), { boolean: true });
const cwd = process.cwd();
const templateChoices = [
    {
        title: 'ts'
    },
    {
        title: 'ts-esm'
    },
    {
        title: 'js'
    },
    {
        title: 'js-esm'
    },
];
const template: PromptObject = {
    message: 'Choose template',
    name: 'template',
    type: 'select',
    choices: templateChoices.map(t => ({ title: t.title, value: `template-${t.title}` }) )
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


const which_manager: PromptObject = {
	message: `Which manager do you want to use?`,
	name: 'manager',
	type: 'select',
	choices: [
		{
			title: 'NPM',
			description: 'Default Package Manager',
			selected: true,
			value: 'npm',
		},
		{
			title: 'Yarn',
			description: 'Yarn Package Manager',
			value: 'yarn',
		},
		{
                        title: 'PNPM',
                        description: 'PNPM Package Manager',
                        value: 'pnpm',
                },
		{
			title: 'Skip',
			description: 'Skip selection',
			value: 'skip',
		},
	],
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
  const selectedTemplate = path.join(cwd, result.template);
  if (argv.overwrite) {
    emptyDir(root);
  } else if (!fs.existsSync(root)) {
    fs.mkdirSync(root, { recursive: true })
  }
  const configJson = createConfig((result.template as string).includes('typescript'))
  await createProject(result.name, configJson, root, selectedTemplate, argv.overwrite);
  
  const installPkgs = await prompt([which_manager]);
  runInstall(installPkgs.manager !== 'skip', root, installPkgs.manager);

}


async function runShort(templateName: string, name:string, pkgManager?: 'yarn'|'npm'|'pnpm') {
    const fullTemplateName = `template-${templateName}`;
    const doesTemplateExist = templateChoices
        .some(tName => tName.title.localeCompare(fullTemplateName, undefined, { sensitivity: 'base'}));
    if(!doesTemplateExist) {
        throw new Error(red('✖') + ' Could not find template: ' + templateName);
    }
    const root = path.join(cwd, name);
    const selectedTemplate = path.join(cwd, fullTemplateName);
    if (argv.overwrite) {
        emptyDir(root);
    } else if (!fs.existsSync(root)) {
        fs.mkdirSync(root, { recursive: true })
   }
  const configJson = createConfig(templateName.includes('typescript'));
   
  await createProject(name, configJson, root, selectedTemplate, argv.overwrite);
  
  runInstall(!pkgManager, root, pkgManager);
}

async function createProject(name: string, config: Record<string,unknown>, root: string, selectedTemplate: string, overwrite?: boolean) {
  console.log(greenBright(`overwrite`)+ `: ${overwrite ?? false};`+`\n`+greenBright('copy')+`: ${selectedTemplate} ${root}`);
  await copyFolderRecursiveAsync(selectedTemplate , root);
  console.log(greenBright('Writing sern.config.json to '+  name + "/sern.config.json"));
  console.log(greenBright('Writing dependencies.d.ts to '+  name));
  await Promise.all([
    fs.promises.writeFile(path.join(root, 'sern.config.json'), JSON.stringify(config), 'utf8'),
    fs.promises.writeFile(path.join(root, 'src', 'dependencies.d.ts'), await fs.promises.readFile(path.join(cwd, 'dependencies.d.txt')), 'utf8')
  ]);

}

async function runInstall(runInstall: boolean, cwd: string, pkgManager?:'yarn'|'npm'|'pnpm') {
    if(!runInstall) return;
    console.log('Installing dependencies with ', magentaBright(pkgManager!));
    spawn(pkgManager!, ['install'], { stdio: 'inherit', cwd });
    process.on('data', s => console.log(s.toString()));
    process.on('error', (e) => {
        console.error(e);
        console.log(red('Something went wrong with installing. Please do it yourself.'))
    })
}

function createConfig(isTypescript: boolean) {
    return {
      language : isTypescript ? 'typescript' : 'javascript', 
      paths: {
        base: 'src',
        cmds_dir: 'commands'
      }
   }
}

async function init() {
    console.log(`Working in: `+ cwd);
    
    if(!argv.template) {
        await runInteractive();
    } else {
        assert(argv.name)
        assert.match(argv.name, new RegExp('^(?:@[a-z0-9-*~][a-z0-9-*._~]*/)?[a-z0-9-~][a-z0-9-._~]*$', 'g'));
        await runShort(argv.template, argv.name, argv.install);
    }
    console.log(greenBright('Done!')+  ' visit https://sern.dev for documentation and join https://sern.dev/discord! Happy hacking :)' );
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

async function copyFolderRecursiveAsync(source: string, target: string) {
  try {
    // Create target folder if it doesn't exist
    if (!fs.existsSync(target)) {
      fs.mkdirSync(target);
    }

    // Get all files and folders in the source folder
    const files = await fs.promises.readdir(source);

    for (const file of files) {
      const currentSource = path.join(source, file);
      const currentTarget = path.join(target, file);

      // Check if the current item is a file or a folder
      const stats = await fs.promises.stat(currentSource);

      if (stats.isDirectory()) {
        // Recursively copy the subfolder
        await copyFolderRecursiveAsync(currentSource, currentTarget);
      } else {
        // Copy the file
        await fs.promises.copyFile(currentSource, currentTarget);
      }
    }
  } catch (err) {
    throw Error('An error occurred: '+  err);
  }
}

init();

