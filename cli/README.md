# @cookest/ui-cli

A command-line tool that adds [Cookest UI](https://github.com/Cookest/cookest-ui-components-library) components directly into your **React** or **Flutter** project — no package linking required.

Inspired by [shadcn/ui](https://ui.shadcn.com/): components are **copied into your project as source files** so you own them completely.

---

## Quick start

```bash
# React project
npx @cookest/ui-cli add button

# Flutter project (auto-detected via pubspec.yaml)
npx @cookest/ui-cli add button

# Force framework explicitly
npx @cookest/ui-cli add button --react
npx @cookest/ui-cli add button --flutter
```

---

## Installation

**Use without installing (recommended):**
```bash
npx @cookest/ui-cli <command>
```

**Install globally:**
```bash
npm install -g @cookest/ui-cli
# or
bun add -g @cookest/ui-cli
```

---

## Commands

### `init`

Detects your framework, locates the ui-components source, and creates a `.cookestrc` config file.

```bash
cookest-ui init
cookest-ui init --yes   # skip all prompts
```

`.cookestrc` example:
```json
{
  "framework": "react",
  "sourceRoot": "../ui-components",
  "componentsDir": "src/components/ui"
}
```

---

### `list`

Shows all 18 available components with React/Flutter availability.

```bash
cookest-ui list

# Filter by name, tag, or description
cookest-ui list --filter form
cookest-ui list --filter loading
```

Output:
```
🌿 Cookest UI — Available Components

  Name        React  Flutter  Description
  ──────────────────────────────────────────────────────────────────────
  button        ✔      ✔      Pressable button with variants, loading state...
  input         ✔      ✔      Text input with label, error, helper text...
  ...
```

---

### `add`

Copies component source files into your project and prints the import statement.

```bash
# Add one component
cookest-ui add button

# Add multiple
cookest-ui add button input card badge

# Add all components at once
cookest-ui add --all

# Force React or Flutter
cookest-ui add tabs --react
cookest-ui add tabs --flutter

# Overwrite existing files
cookest-ui add button --overwrite

# Interactive picker (no args)
cookest-ui add
```

**React output example:**
```
🌿 Adding 1 component (react)

  Adding button...
    ✔ src/components/ui/Button.tsx
    ✔ src/components/ui/Button/index.ts

  Run to install dependencies:
  bun add framer-motion

  Import in your project:
  import { Button } from '@/components/ui/Button';

  ✔ Done!
```

**Flutter output example:**
```
🌿 Adding 1 component (flutter)

  Adding button...
    ✔ lib/ui/ck_button.dart

  Add to pubspec.yaml dependencies:
    google_fonts: ^8.0.0
  Then run: flutter pub get

  Import in your Dart file:
  import 'lib/ui/ck_button.dart';

  ✔ Done!
```

---

### `diff`

Checks which locally installed components differ from the source registry (useful after upgrading).

```bash
# Check all installed components
cookest-ui diff

# Check specific ones
cookest-ui diff button card tabs

# Check Flutter widgets
cookest-ui diff --flutter
```

---

## Available Components

| Component | React | Flutter | Tags |
|---|---|---|---|
| `button` | ✅ | ✅ | action, form |
| `input` | ✅ | ✅ | form, text |
| `textarea` | ✅ | ✅ | form, multiline |
| `card` | ✅ | ✅ | layout, container |
| `badge` | ✅ | ✅ | label, status |
| `avatar` | ✅ | ✅ | user, profile |
| `modal` | ✅ | ✅ | overlay, dialog |
| `tooltip` | ✅ | ✅ | overlay, info |
| `toggle` | ✅ | ✅ | form, switch |
| `select` | ✅ | ✅ | form, dropdown |
| `skeleton` | ✅ | ✅ | loading, state |
| `alert` | ✅ | ✅ | feedback, banner |
| `divider` | ✅ | ✅ | layout |
| `slider` | ✅ | ✅ | form, range |
| `progress` | ✅ | ✅ | loading, feedback |
| `spinner` | ✅ | ✅ | loading, animation |
| `tabs` | ✅ | ✅ | navigation |
| `accordion` | ✅ | ✅ | layout, disclosure |

---

## Framework Auto-detection

The CLI detects your framework automatically:

| Signal | Framework |
|---|---|
| `pubspec.yaml` with `sdk: flutter` | Flutter |
| `package.json` with `react` or `next` dependency | React |
| `package.json` only | React (generic) |

Override with `--react` or `--flutter` flags on any command.

---

## Using in a monorepo

If `ui-components/` is in the same monorepo, run `cookest-ui init` once — it auto-discovers the source by walking up the directory tree. The resulting `.cookestrc` pinpoints the path:

```json
{
  "framework": "react",
  "sourceRoot": "../../ui-components"
}
```

Or set an env variable:
```bash
COOKEST_SOURCE_ROOT=/path/to/ui-components cookest-ui add button
```

---

## How it works

1. **Registry** (`src/registry.ts`) maps each component name to its React `.tsx` and Flutter `.dart` source files.
2. **`add` command** resolves the source root, copies the files to your project with `fs.copyFile`.
3. **React**: adds missing `framer-motion` etc. to `package.json` and prints the install command.
4. **Flutter**: prints the `pubspec.yaml` snippet for any missing `pub.dev` dependencies.
5. **`diff` command** compares installed files byte-for-byte with the registry source.

---

## Development

```bash
cd ui-components/cli
bun install
bun run dev        # watch mode
bun run build      # production build → dist/index.js

# Test locally
node dist/index.js list
node dist/index.js add button --react
```
