import { existsSync } from 'fs';
import { copyFile, mkdir, readFile, writeFile } from 'fs/promises';
import path from 'path';
import chalk from 'chalk';
import type { ReactFile, FlutterFile } from '../registry.js';

export async function copyFiles(
  files: (ReactFile | FlutterFile)[],
  sourceRoot: string,
  projectRoot: string,
  overwrite: boolean = false,
): Promise<{ copied: string[]; skipped: string[] }> {
  const copied: string[] = [];
  const skipped: string[] = [];

  for (const file of files) {
    const src = path.join(sourceRoot, file.src);
    const dest = path.join(projectRoot, file.dest);

    if (!existsSync(src)) {
      console.warn(chalk.yellow(`  ⚠ Source not found: ${file.src}`));
      continue;
    }

    if (existsSync(dest) && !overwrite) {
      skipped.push(file.dest);
      continue;
    }

    await mkdir(path.dirname(dest), { recursive: true });
    await copyFile(src, dest);
    copied.push(file.dest);
  }

  return { copied, skipped };
}

/** Add npm dependencies to the project's package.json (devDependencies untouched). */
export async function addNpmDependencies(
  deps: string[],
  projectRoot: string,
): Promise<void> {
  const pkgPath = path.join(projectRoot, 'package.json');
  if (!existsSync(pkgPath)) return;

  const pkg = JSON.parse(await readFile(pkgPath, 'utf-8'));
  const existing = {
    ...pkg.dependencies,
    ...pkg.devDependencies,
    ...pkg.peerDependencies,
  };

  const missing = deps.filter((d) => !existing[d]);
  if (missing.length === 0) return;

  // Add to dependencies with wildcard version — user runs install after
  pkg.dependencies = pkg.dependencies ?? {};
  for (const dep of missing) {
    pkg.dependencies[dep] = 'latest';
  }
  await writeFile(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf-8');
}

/** Print pubspec.yaml snippet for Flutter dependencies. */
export function printPubspecSnippet(deps: string[]): void {
  if (deps.length === 0) return;
  console.log(chalk.dim('\n  Add to pubspec.yaml dependencies:'));
  for (const dep of deps) {
    console.log(chalk.cyan(`    ${dep}: ^1.0.0`));
  }
  console.log(chalk.dim('  Then run: flutter pub get\n'));
}

/** Detect if a pubspec.yaml already has a dependency. */
export async function pubspecHasDep(dep: string, projectRoot: string): Promise<boolean> {
  const pubspecPath = path.join(projectRoot, 'pubspec.yaml');
  if (!existsSync(pubspecPath)) return false;
  try {
    const content = await readFile(pubspecPath, 'utf-8');
    return content.includes(`${dep}:`);
  } catch {
    return false;
  }
}
