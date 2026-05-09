import chalk from 'chalk';
import { registry } from '../registry.js';
import type { Category } from '../registry.js';

const CATEGORY_LABELS: Record<Category, string> = {
  input: 'Inputs',
  display: 'Display',
  navigation: 'Navigation',
  layout: 'Layout',
};

const CATEGORY_ORDER: Category[] = ['input', 'display', 'navigation', 'layout'];

export function runList(opts: { filter?: string }) {
  const filter = opts.filter?.toLowerCase();

  const entries = Object.entries(registry).filter(([name, entry]) => {
    if (!filter) return true;
    return (
      name.includes(filter) ||
      entry.description.toLowerCase().includes(filter) ||
      entry.tags.some((t) => t.includes(filter))
    );
  });

  if (entries.length === 0) {
    console.log(chalk.yellow(`\n  No components matching "${filter}"\n`));
    return;
  }

  const maxName = Math.max(...entries.map(([n]) => n.length));

  console.log(chalk.bold(`\n  Cookest UI  ${chalk.dim(`${entries.length} components`)}\n`));

  for (const cat of CATEGORY_ORDER) {
    const group = entries.filter(([, e]) => e.category === cat);
    if (group.length === 0) continue;

    console.log(chalk.dim(`  ${CATEGORY_LABELS[cat]}`));
    console.log(chalk.dim('  ' + '─'.repeat(maxName + 4 + 55)));

    for (const [name, entry] of group) {
      console.log(
        '  ' +
          chalk.cyan(name.padEnd(maxName + 4)) +
          chalk.white(entry.description),
      );
    }

    console.log();
  }

  console.log(chalk.dim('  cookest-ui add <component>\n'));
}
