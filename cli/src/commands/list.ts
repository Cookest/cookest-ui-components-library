import chalk from 'chalk';
import { registry } from '../registry.js';

export function runList(opts: { filter?: string }) {
  const filter = opts.filter?.toLowerCase();

  const components = Object.entries(registry).filter(([name, entry]) => {
    if (!filter) return true;
    return (
      name.includes(filter) ||
      entry.description.toLowerCase().includes(filter) ||
      entry.tags.some((t) => t.includes(filter))
    );
  });

  if (components.length === 0) {
    console.log(chalk.yellow(`No components matching "${filter}"`));
    return;
  }

  const maxName = Math.max(...components.map(([n]) => n.length));

  console.log(chalk.bold('\n🌿 Cookest UI — Available Components\n'));
  console.log(
    chalk.dim('  ' + 'Name'.padEnd(maxName + 2) + 'React  Flutter  Description'),
  );
  console.log(chalk.dim('  ' + '─'.repeat(70)));

  for (const [name, entry] of components) {
    const reactIcon = entry.react ? chalk.green('  ✔  ') : chalk.dim('  –  ');
    const flutterIcon = entry.flutter ? chalk.blue('  ✔   ') : chalk.dim('  –   ');
    console.log(
      '  ' +
        chalk.cyan(name.padEnd(maxName + 2)) +
        reactIcon +
        flutterIcon +
        chalk.dim(entry.description.slice(0, 50)),
    );
  }

  console.log(chalk.dim(`\n  Total: ${components.length} component${components.length !== 1 ? 's' : ''}`));
  console.log(chalk.dim('  Usage: cookest-ui add <component>\n'));
}
