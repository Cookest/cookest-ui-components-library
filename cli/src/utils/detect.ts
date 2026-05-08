import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import path from 'path';

export type Framework = 'react' | 'flutter' | 'unknown';

export type ProjectInfo = {
  framework: Framework;
  /** Absolute path to the project root (where package.json or pubspec.yaml lives) */
  root: string;
  /** For React: package manager detected */
  packageManager?: 'npm' | 'yarn' | 'pnpm' | 'bun';
};

/** Walk up the directory tree looking for a root marker file. */
function findRoot(marker: string, from: string = process.cwd()): string | null {
  let dir = from;
  while (true) {
    if (existsSync(path.join(dir, marker))) return dir;
    const parent = path.dirname(dir);
    if (parent === dir) return null;
    dir = parent;
  }
}

function detectPackageManager(root: string): ProjectInfo['packageManager'] {
  if (existsSync(path.join(root, 'bun.lock'))) return 'bun';
  if (existsSync(path.join(root, 'pnpm-lock.yaml'))) return 'pnpm';
  if (existsSync(path.join(root, 'yarn.lock'))) return 'yarn';
  return 'npm';
}

export async function detectFramework(): Promise<ProjectInfo> {
  const cwd = process.cwd();

  // Flutter first — pubspec.yaml
  const flutterRoot = findRoot('pubspec.yaml', cwd);
  if (flutterRoot) {
    try {
      const pubspec = await readFile(path.join(flutterRoot, 'pubspec.yaml'), 'utf-8');
      if (pubspec.includes('flutter:') || pubspec.includes('sdk: flutter')) {
        return { framework: 'flutter', root: flutterRoot };
      }
    } catch {}
  }

  // React / Node
  const reactRoot = findRoot('package.json', cwd);
  if (reactRoot) {
    try {
      const pkg = JSON.parse(await readFile(path.join(reactRoot, 'package.json'), 'utf-8'));
      const deps = { ...pkg.dependencies, ...pkg.devDependencies, ...pkg.peerDependencies };
      if (deps['react'] || deps['next'] || deps['vite']) {
        return {
          framework: 'react',
          root: reactRoot,
          packageManager: detectPackageManager(reactRoot),
        };
      }
    } catch {}
    // Still a node project, treat as react-capable
    return {
      framework: 'react',
      root: reactRoot,
      packageManager: detectPackageManager(reactRoot),
    };
  }

  return { framework: 'unknown', root: cwd };
}

/** Resolve the path to the ui-components source directory.
 *  Looks for a .cookestrc config first, then walks up looking for ui-components/. */
export async function resolveSourceRoot(configPath?: string): Promise<string> {
  // 1. Use config if present
  if (configPath && existsSync(configPath)) {
    const cfg = JSON.parse(await readFile(configPath, 'utf-8'));
    if (cfg.sourceRoot) return path.resolve(cfg.sourceRoot);
  }

  // 2. Walk up looking for .cookestrc
  const rcRoot = findRoot('.cookestrc');
  if (rcRoot) {
    try {
      const cfg = JSON.parse(await readFile(path.join(rcRoot, '.cookestrc'), 'utf-8'));
      if (cfg.sourceRoot) return path.resolve(rcRoot, cfg.sourceRoot);
    } catch {}
  }

  // 3. Env var override (useful in CI / monorepo setups)
  if (process.env.COOKEST_SOURCE_ROOT) {
    return path.resolve(process.env.COOKEST_SOURCE_ROOT);
  }

  // 4. Walk up looking for ui-components/ directory
  let dir = process.cwd();
  while (true) {
    const candidate = path.join(dir, 'ui-components');
    if (existsSync(candidate) && existsSync(path.join(candidate, 'src'))) {
      return candidate;
    }
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }

  throw new Error(
    'Could not locate Cookest UI source.\n' +
    'Run `cookest-ui init` to create a .cookestrc config, or set COOKEST_SOURCE_ROOT.'
  );
}
