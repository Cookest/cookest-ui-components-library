import path from 'path';
import chalk from 'chalk';
import prompts from 'prompts';
import { registry, componentNames } from '../registry.js';
import { detectFramework, resolveSourceRoot } from '../utils/detect.js';
import { copyFiles, addNpmDependencies, printPubspecSnippet, pubspecHasDep } from '../utils/copy.js';

type AddOptions = {
  flutter?: boolean;
  react?: boolean;
  overwrite?: boolean;
  all?: boolean;
  yes?: boolean;
};

export async function runAdd(components: string[], opts: AddOptions) {
  // Determine framework
  const project = await detectFramework();
  let framework = opts.flutter ? 'flutter' : opts.react ? 'react' : project.framework;

  if (framework === 'unknown') {
    const { fw } = await prompts({
      type: 'select',
      name: 'fw',
      message: 'Which framework?',
      choices: [
        { title: 'React', value: 'react' },
        { title: 'Flutter', value: 'flutter' },
      ],
    });
    framework = fw;
  }

  // Resolve components list
  let targets = opts.all ? componentNames : components;

  if (targets.length === 0) {
    const { chosen } = await prompts({
      type: 'multiselect',
      name: 'chosen',
      message: 'Select components to add:',
      choices: componentNames.map((n) => ({
        title: `${n} — ${registry[n].description.slice(0, 45)}`,
        value: n,
        selected: false,
      })),
      hint: 'Space to select, Enter to confirm',
    });
    targets = chosen ?? [];
  }

  if (targets.length === 0) {
    console.log(chalk.yellow('Nothing selected.'));
    return;
  }

  // Validate names
  const invalid = targets.filter((n) => !registry[n]);
  if (invalid.length > 0) {
    console.error(chalk.red(`Unknown component${invalid.length > 1 ? 's' : ''}: ${invalid.join(', ')}`));
    console.error(chalk.dim('Run `cookest-ui list` to see available components.'));
    process.exit(1);
  }

  // Resolve source root (null = fetch from GitHub registry)
  const sourceRoot = await resolveSourceRoot();
  if (sourceRoot) {
    console.log(chalk.dim(`  Source: ${path.relative(project.root, sourceRoot)}\n`));
  } else {
    console.log(chalk.dim('  Fetching from registry (github.com/Cookest)\n'));
  }

  console.log(chalk.bold(`  Adding ${targets.length} component${targets.length > 1 ? 's' : ''} (${framework})\n`));

  const allMissingNpmDeps = new Set<string>();
  const allMissingPubDeps = new Set<string>();

  for (const name of targets) {
    const entry = registry[name];
    const frameworkEntry = framework === 'react' ? entry.react : entry.flutter;

    if (!frameworkEntry) {
      console.log(chalk.yellow(`  ⚠ ${name}: no ${framework} implementation available, skipping.`));
      continue;
    }

    console.log(chalk.cyan(`  Adding ${name}...`));

    const { copied, skipped } = await copyFiles(
      frameworkEntry.files,
      sourceRoot,
      project.root,
      opts.overwrite ?? false,
    );

    for (const f of copied) {
      console.log(chalk.green(`    ✔ ${f}`));
    }
    for (const f of skipped) {
      console.log(chalk.dim(`    – ${f} (already exists, use --overwrite to replace)`));
    }

    if (framework === 'react' && 'dependencies' in frameworkEntry) {
      (frameworkEntry.dependencies ?? []).forEach((d) => allMissingNpmDeps.add(d));
    }

    if (framework === 'flutter' && 'pubDependencies' in frameworkEntry) {
      for (const dep of frameworkEntry.pubDependencies ?? []) {
        const already = await pubspecHasDep(dep, project.root);
        if (!already) allMissingPubDeps.add(dep);
      }
    }
  }

  // Post-install instructions
  if (framework === 'react' && allMissingNpmDeps.size > 0) {
    const deps = [...allMissingNpmDeps];
    console.log(chalk.dim('\n  Adding peer dependencies to package.json...'));
    await addNpmDependencies(deps, project.root);
    const pm = project.packageManager ?? 'npm';
    const installCmd =
      pm === 'bun'
        ? `bun add ${deps.join(' ')}`
        : pm === 'pnpm'
          ? `pnpm add ${deps.join(' ')}`
          : pm === 'yarn'
            ? `yarn add ${deps.join(' ')}`
            : `npm install ${deps.join(' ')}`;

    console.log(chalk.yellow(`\n  Run to install dependencies:`));
    console.log(chalk.bold(`  ${installCmd}\n`));
  }

  if (framework === 'flutter' && allMissingPubDeps.size > 0) {
    printPubspecSnippet([...allMissingPubDeps]);
  }

  if (framework === 'react') {
    console.log(chalk.dim('  Import in your project:'));
    for (const name of targets) {
      if (registry[name].react) {
        const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
        console.log(chalk.cyan(`  import { ${capitalized} } from '@/components/ui/${capitalized}';`));
      }
    }
  }

  if (framework === 'flutter') {
    console.log(chalk.dim('  Import in your Dart file:'));
    for (const name of targets) {
      if (registry[name].flutter) {
        console.log(chalk.cyan(`  import 'lib/ui/ck_${name}.dart';`));
      }
    }
  }

  console.log(chalk.green('\n  ✔ Done!\n'));
}
