import { Command } from 'commander';
import chalk from 'chalk';
import { runInit } from './commands/init.js';
import { runList } from './commands/list.js';
import { runAdd } from './commands/add.js';
import { runDiff } from './commands/diff.js';
import { runCompletion } from './commands/completion.js';

const program = new Command();

program
  .name('cookest-ui')
  .description(
    chalk.bold('🌿 Cookest UI') +
    ' — add components to your React or Flutter project',
  )
  .version('0.1.0');

// ─── init ─────────────────────────────────────────────────────────────────────
program
  .command('init')
  .description('Initialize Cookest UI in the current project')
  .option('-y, --yes', 'skip confirmation prompts')
  .action(async (opts) => {
    await runInit({ yes: opts.yes });
  });

// ─── list ─────────────────────────────────────────────────────────────────────
program
  .command('list')
  .description('List all available components')
  .option('-f, --filter <query>', 'filter by name, tag, or description')
  .action((opts) => {
    runList({ filter: opts.filter });
  });

// ─── add ──────────────────────────────────────────────────────────────────────
program
  .command('add [components...]')
  .description('Add one or more components to your project')
  .option('--react', 'force React output (auto-detected by default)')
  .option('--flutter', 'force Flutter output (auto-detected by default)')
  .option('--overwrite', 'overwrite existing files')
  .option('--all', 'add every available component')
  .option('-y, --yes', 'skip confirmation prompts')
  .action(async (components: string[], opts) => {
    await runAdd(components, {
      flutter: opts.flutter,
      react: opts.react,
      overwrite: opts.overwrite,
      all: opts.all,
      yes: opts.yes,
    });
  });

// ─── diff ─────────────────────────────────────────────────────────────────────
program
  .command('diff [components...]')
  .description('Show which local component files differ from the registry source')
  .option('--flutter', 'check Flutter widget files')
  .action(async (components: string[], opts) => {
    await runDiff(components, { flutter: opts.flutter });
  });

// ─── completion ───────────────────────────────────────────────────────────────
program
  .command('completion [shell]')
  .description('Generate shell completion script (bash, zsh, fish)')
  .action((shell?: string) => {
    runCompletion(shell);
  });

program.parse();
