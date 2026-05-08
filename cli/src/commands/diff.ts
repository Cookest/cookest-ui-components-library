import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import path from 'path';
import chalk from 'chalk';
import { registry, componentNames } from '../registry.js';
import { detectFramework, resolveSourceRoot } from '../utils/detect.js';

type DiffOptions = { flutter?: boolean };

export async function runDiff(components: string[], opts: DiffOptions) {
  const project = await detectFramework();
  const framework = opts.flutter ? 'flutter' : project.framework === 'flutter' ? 'flutter' : 'react';

  let targets = components.length > 0 ? components : componentNames;
  const invalid = targets.filter((n) => !registry[n]);
  if (invalid.length > 0) {
    console.error(chalk.red(`Unknown: ${invalid.join(', ')}`));
    process.exit(1);
  }

  let sourceRoot: string;
  try {
    sourceRoot = await resolveSourceRoot();
  } catch (err) {
    console.error(chalk.red((err as Error).message));
    process.exit(1);
  }

  console.log(chalk.bold(`\n🌿 Diffing ${targets.length} component${targets.length > 1 ? 's' : ''} (${framework})\n`));

  let changedCount = 0;

  for (const name of targets) {
    const entry = registry[name];
    const frameworkEntry = framework === 'react' ? entry.react : entry.flutter;
    if (!frameworkEntry) continue;

    for (const file of frameworkEntry.files) {
      const srcPath = path.join(sourceRoot, file.src);
      const destPath = path.join(project.root, file.dest);

      if (!existsSync(destPath)) continue; // not installed locally
      if (!existsSync(srcPath)) {
        console.log(chalk.yellow(`  ⚠ ${name}: source missing (${file.src})`));
        continue;
      }

      const [srcContent, destContent] = await Promise.all([
        readFile(srcPath, 'utf-8'),
        readFile(destPath, 'utf-8'),
      ]);

      if (srcContent !== destContent) {
        changedCount++;
        console.log(chalk.yellow(`  ~ ${name}: ${file.dest} differs from source`));
        console.log(chalk.dim(`      source: ${file.src}`));
        console.log(chalk.dim('      Run `cookest-ui add --overwrite` to update.'));
      }
    }
  }

  if (changedCount === 0) {
    console.log(chalk.green('  ✔ All installed components are up to date.\n'));
  } else {
    console.log(chalk.yellow(`\n  ${changedCount} file${changedCount > 1 ? 's' : ''} differ from source.\n`));
  }
}
