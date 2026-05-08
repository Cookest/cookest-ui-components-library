import { existsSync } from 'fs';
import { writeFile } from 'fs/promises';
import path from 'path';
import chalk from 'chalk';
import prompts from 'prompts';
import { detectFramework, resolveSourceRoot } from '../utils/detect.js';

export type CookestConfig = {
  framework: 'react' | 'flutter';
  /** Path to ui-components source root, relative to the .cookestrc location */
  sourceRoot: string;
  /** For React: where components should be copied */
  componentsDir?: string;
  /** For Flutter: where widgets should be copied */
  libDir?: string;
};

export async function runInit(opts: { yes?: boolean }) {
  console.log(chalk.bold('\n🌿 Cookest UI — Init\n'));

  const project = await detectFramework();

  let framework = project.framework;
  if (framework === 'unknown') {
    const { fw } = await prompts({
      type: 'select',
      name: 'fw',
      message: 'Which framework are you using?',
      choices: [
        { title: 'React / Next.js', value: 'react' },
        { title: 'Flutter', value: 'flutter' },
      ],
    });
    framework = fw;
  } else {
    console.log(chalk.green(`  ✔ Detected: ${framework === 'react' ? 'React' : 'Flutter'}`));
  }

  // Locate source root
  let sourceRoot: string;
  try {
    sourceRoot = await resolveSourceRoot();
    const rel = path.relative(project.root, sourceRoot);
    console.log(chalk.green(`  ✔ Found ui-components source: ${rel}`));
  } catch {
    const { sr } = await prompts({
      type: 'text',
      name: 'sr',
      message: 'Path to ui-components directory (relative or absolute):',
      initial: '../ui-components',
    });
    sourceRoot = path.resolve(project.root, sr);
    if (!existsSync(sourceRoot)) {
      console.error(chalk.red(`  ✘ Path not found: ${sourceRoot}`));
      process.exit(1);
    }
  }

  const config: CookestConfig = {
    framework: framework as 'react' | 'flutter',
    sourceRoot: path.relative(project.root, sourceRoot),
    ...(framework === 'react'
      ? { componentsDir: 'src/components/ui' }
      : { libDir: 'lib/ui' }),
  };

  const rcPath = path.join(project.root, '.cookestrc');
  if (existsSync(rcPath) && !opts.yes) {
    const { overwrite } = await prompts({
      type: 'confirm',
      name: 'overwrite',
      message: '.cookestrc already exists. Overwrite?',
      initial: false,
    });
    if (!overwrite) {
      console.log(chalk.dim('  Skipped.'));
      return;
    }
  }

  await writeFile(rcPath, JSON.stringify(config, null, 2) + '\n', 'utf-8');
  console.log(chalk.green(`\n  ✔ Created .cookestrc`));
  console.log(chalk.dim(`\n  Next: cookest-ui list\n  Then: cookest-ui add button\n`));
}
