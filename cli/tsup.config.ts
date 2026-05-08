import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs'],
  target: 'node18',
  dts: false,
  clean: true,
  banner: {
    js: '#!/usr/bin/env node',
  },
  // Bundle all deps so the CLI works without node_modules
  noExternal: [/./],
  platform: 'node',
});
