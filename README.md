# @cookest/ui

Cookest design system — a React component library built with TailwindCSS 4 and Framer Motion.

## Installation

```bash
bun add @cookest/ui
```

### Peer Dependencies

```bash
bun add react react-dom framer-motion
```

## Usage

```tsx
import { Button, Card, Input } from "@cookest/ui";
import "@cookest/ui/styles.css";

export default function App() {
  return (
    <Card>
      <Input label="Email" type="email" />
      <Button variant="primary">Submit</Button>
    </Card>
  );
}
```

## Design Tokens

Access Cookest design tokens directly:

```ts
import { colors, spacing, typography } from "@cookest/ui/tokens";
```

## Development

```bash
# Install dependencies
bun install

# Run Storybook
bun run storybook

# Run tests
bun run test

# Build library
bun run build
```

## Component Library

| Component | Description |
|-----------|-------------|
| `Button` | Primary, secondary, ghost, danger variants with loading state |
| `Input` | Text input with label, helper text, error state, icon slots |
| `Card` | Container with header, body, footer sections |
| `Badge` | Status indicators with dot, removable option |
| `Avatar` | User avatar with image, initials fallback, sizes |
| `Modal` | Dialog overlay with focus trap, keyboard dismiss |
| `Tooltip` | Positioned tooltip with arrow and animation |
| `Toggle` | Switch input with label and disabled state |
| `Select` | Custom dropdown with keyboard navigation |
| `Skeleton` | Loading placeholder with pulse animation |
| `Alert` | Contextual feedback (info, success, warning, error) |
| `Divider` | Visual separator, horizontal or vertical |

## Commit Conventions

All commits follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>
```

See the [Cookest Best Practices](https://cookest-docs.vercel.app/docs/contributing/best-practices) for full details.
