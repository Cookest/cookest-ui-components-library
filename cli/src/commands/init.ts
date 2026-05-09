import { existsSync } from 'fs';
import { writeFile } from 'fs/promises';
import path from 'path';
import chalk from 'chalk';
import prompts from 'prompts';
import { detectFramework } from '../utils/detect.js';

export type CookestConfig = {
  framework: 'react' | 'flutter';
  /** For React: where components should be copied */
  componentsDir?: string;
  /** For Flutter: where widgets should be copied */
  libDir?: string;
};

export async function runInit(opts: { yes?: boolean }) {
  console.log(chalk.bold('\n  Cookest UI\n'));

  const project = await detectFramework();
  let framework = project.framework;

  if (framework === 'unknown') {
    const { fw } = await prompts({
      type: 'select',
      name: 'fw',
      message: 'Framework:',
      choices: [
        { title: 'React / Next.js', value: 'react' },
        { title: 'Flutter', value: 'flutter' },
      ],
    });
    if (!fw) return;
    framework = fw;
  } else {
    const label =
      framework === 'react'
        ? project.packageManager
          ? `React  (${project.packageManager})`
          : 'React'
        : 'Flutter';
    console.log(chalk.green(`  ✔ ${label} detected`));
  }

  const rcPath = path.join(project.root, '.cookestrc');
  if (existsSync(rcPath) && !opts.yes) {
    const { overwrite } = await prompts({
      type: 'confirm',
      name: 'overwrite',
      message: '.cookestrc already exists — overwrite?',
      initial: false,
    });
    if (!overwrite) {
      console.log(chalk.dim('\n  Skipped.\n'));
      return;
    }
  }

  const config: CookestConfig = {
    framework: framework as 'react' | 'flutter',
    ...(framework === 'react'
      ? { componentsDir: 'src/components/ui' }
      : { libDir: 'lib/ui' }),
  };

  await writeFile(rcPath, JSON.stringify(config, null, 2) + '\n', 'utf-8');
  console.log(chalk.green('  ✔ Created .cookestrc\n'));

  // Print next steps
  const pm = project.packageManager ?? 'npm';
  const addCmd =
    pm === 'bun'
      ? 'bun add'
      : pm === 'pnpm'
        ? 'pnpm add'
        : pm === 'yarn'
          ? 'yarn add'
          : 'npm install';

  console.log(chalk.bold('  Next steps\n'));
  console.log(`  ${chalk.dim('1.')} ${chalk.white(`${addCmd} @cookest/ui`)}`);
  console.log(`  ${chalk.dim('2.')} ${chalk.white('cookest-ui add button input badge')}`);
  console.log(`  ${chalk.dim('3.')} ${chalk.cyan('import { Button } from "@cookest/ui"')}\n`);
  console.log(chalk.dim('  Docs: https://docs.cookest.app\n'));
}
