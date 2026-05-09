// Component registry — maps every component name to its React and Flutter source files.
// Paths are relative to the ui-components root.

export type ReactFile = {
  /** Path in the source repo (relative to ui-components/) */
  src: string;
  /** Default destination path inside the user's project (relative to cwd) */
  dest: string;
};

export type FlutterFile = {
  src: string;
  dest: string;
};

export type Category = 'input' | 'display' | 'navigation' | 'layout';

export type ComponentEntry = {
  /** Human-readable description */
  description: string;
  /** Group for display purposes */
  category: Category;
  /** Tags for search / filtering */
  tags: string[];
  react?: {
    files: ReactFile[];
    /** npm packages to install (prod) */
    dependencies?: string[];
  };
  flutter?: {
    files: FlutterFile[];
    /** packages to add to pubspec.yaml dependencies */
    pubDependencies?: string[];
  };
};

export type Registry = Record<string, ComponentEntry>;

export const registry: Registry = {
  button: {
    description: 'Pressable button with variants, loading state, and icon support.',
    category: 'input',
    tags: ['action', 'form', 'interactive'],
    react: {
      files: [
        { src: 'src/components/Button/Button.tsx', dest: 'src/components/ui/Button.tsx' },
        { src: 'src/components/Button/index.ts', dest: 'src/components/ui/Button/index.ts' },
      ],
      dependencies: ['framer-motion'],
    },
    flutter: {
      files: [
        { src: 'flutter/lib/src/widgets/ck_button.dart', dest: 'lib/ui/ck_button.dart' },
      ],
      pubDependencies: ['google_fonts'],
    },
  },
  input: {
    description: 'Text input with label, error, helper text, and leading/trailing icons.',
    category: 'input',
    tags: ['form', 'text', 'field'],
    react: {
      files: [
        { src: 'src/components/Input/Input.tsx', dest: 'src/components/ui/Input.tsx' },
        { src: 'src/components/Input/index.ts', dest: 'src/components/ui/Input/index.ts' },
      ],
    },
    flutter: {
      files: [
        { src: 'flutter/lib/src/widgets/ck_input.dart', dest: 'lib/ui/ck_input.dart' },
      ],
      pubDependencies: ['google_fonts'],
    },
  },
  textarea: {
    description: 'Multi-line text area with character count, auto-resize, and validation.',
    category: 'input',
    tags: ['form', 'text', 'field', 'multiline'],
    react: {
      files: [
        { src: 'src/components/Textarea/Textarea.tsx', dest: 'src/components/ui/Textarea.tsx' },
        { src: 'src/components/Textarea/index.ts', dest: 'src/components/ui/Textarea/index.ts' },
      ],
    },
    flutter: {
      files: [
        { src: 'flutter/lib/src/widgets/ck_textarea.dart', dest: 'lib/ui/ck_textarea.dart' },
      ],
      pubDependencies: ['google_fonts'],
    },
  },
  card: {
    description: 'Container with header, body, footer, and interactive variant.',
    category: 'layout',
    tags: ['layout', 'container', 'surface'],
    react: {
      files: [
        { src: 'src/components/Card/Card.tsx', dest: 'src/components/ui/Card.tsx' },
        { src: 'src/components/Card/index.ts', dest: 'src/components/ui/Card/index.ts' },
      ],
      dependencies: ['framer-motion'],
    },
    flutter: {
      files: [
        { src: 'flutter/lib/src/widgets/ck_card.dart', dest: 'lib/ui/ck_card.dart' },
      ],
      pubDependencies: ['google_fonts'],
    },
  },
  badge: {
    description: 'Status label — info, success, warning, error, neutral. Supports dot and removable.',
    category: 'display',
    tags: ['label', 'status', 'tag'],
    react: {
      files: [
        { src: 'src/components/Badge/Badge.tsx', dest: 'src/components/ui/Badge.tsx' },
        { src: 'src/components/Badge/index.ts', dest: 'src/components/ui/Badge/index.ts' },
      ],
    },
    flutter: {
      files: [
        { src: 'flutter/lib/src/widgets/ck_badge.dart', dest: 'lib/ui/ck_badge.dart' },
      ],
      pubDependencies: ['google_fonts'],
    },
  },
  avatar: {
    description: 'User avatar with image, initials fallback, status dot, and size variants.',
    category: 'display',
    tags: ['user', 'profile', 'image'],
    react: {
      files: [
        { src: 'src/components/Avatar/Avatar.tsx', dest: 'src/components/ui/Avatar.tsx' },
        { src: 'src/components/Avatar/index.ts', dest: 'src/components/ui/Avatar/index.ts' },
      ],
    },
    flutter: {
      files: [
        { src: 'flutter/lib/src/widgets/ck_avatar.dart', dest: 'lib/ui/ck_avatar.dart' },
      ],
      pubDependencies: ['google_fonts'],
    },
  },
  modal: {
    description: 'Dialog / bottom sheet with animated transitions and focus trap.',
    category: 'display',
    tags: ['overlay', 'dialog', 'popup'],
    react: {
      files: [
        { src: 'src/components/Modal/Modal.tsx', dest: 'src/components/ui/Modal.tsx' },
        { src: 'src/components/Modal/index.ts', dest: 'src/components/ui/Modal/index.ts' },
      ],
      dependencies: ['framer-motion'],
    },
    flutter: {
      files: [
        { src: 'flutter/lib/src/widgets/ck_modal.dart', dest: 'lib/ui/ck_modal.dart' },
      ],
      pubDependencies: ['google_fonts'],
    },
  },
  tooltip: {
    description: 'Contextual tooltip overlay with positioning and animation.',
    category: 'display',
    tags: ['overlay', 'info', 'popup'],
    react: {
      files: [
        { src: 'src/components/Tooltip/Tooltip.tsx', dest: 'src/components/ui/Tooltip.tsx' },
        { src: 'src/components/Tooltip/index.ts', dest: 'src/components/ui/Tooltip/index.ts' },
      ],
      dependencies: ['framer-motion'],
    },
    flutter: {
      files: [
        { src: 'flutter/lib/src/widgets/ck_tooltip.dart', dest: 'lib/ui/ck_tooltip.dart' },
      ],
    },
  },
  toggle: {
    description: 'Animated on/off switch with label and size variants.',
    category: 'input',
    tags: ['form', 'switch', 'interactive'],
    react: {
      files: [
        { src: 'src/components/Toggle/Toggle.tsx', dest: 'src/components/ui/Toggle.tsx' },
        { src: 'src/components/Toggle/index.ts', dest: 'src/components/ui/Toggle/index.ts' },
      ],
      dependencies: ['framer-motion'],
    },
    flutter: {
      files: [
        { src: 'flutter/lib/src/widgets/ck_toggle.dart', dest: 'lib/ui/ck_toggle.dart' },
      ],
      pubDependencies: ['google_fonts'],
    },
  },
  select: {
    description: 'Custom dropdown with search, keyboard navigation, and ARIA combobox.',
    category: 'input',
    tags: ['form', 'dropdown', 'picker'],
    react: {
      files: [
        { src: 'src/components/Select/Select.tsx', dest: 'src/components/ui/Select.tsx' },
        { src: 'src/components/Select/index.ts', dest: 'src/components/ui/Select/index.ts' },
      ],
      dependencies: ['framer-motion'],
    },
    flutter: {
      files: [
        { src: 'flutter/lib/src/widgets/ck_select.dart', dest: 'lib/ui/ck_select.dart' },
      ],
      pubDependencies: ['google_fonts'],
    },
  },
  skeleton: {
    description: 'Loading placeholders — text lines, circle, and card variants.',
    category: 'display',
    tags: ['loading', 'placeholder', 'state'],
    react: {
      files: [
        { src: 'src/components/Skeleton/Skeleton.tsx', dest: 'src/components/ui/Skeleton.tsx' },
        { src: 'src/components/Skeleton/index.ts', dest: 'src/components/ui/Skeleton/index.ts' },
      ],
    },
    flutter: {
      files: [
        { src: 'flutter/lib/src/widgets/ck_skeleton.dart', dest: 'lib/ui/ck_skeleton.dart' },
      ],
    },
  },
  alert: {
    description: 'Info, success, warning, error banners with glassmorphism and dismiss.',
    category: 'display',
    tags: ['feedback', 'notification', 'banner'],
    react: {
      files: [
        { src: 'src/components/Alert/Alert.tsx', dest: 'src/components/ui/Alert.tsx' },
        { src: 'src/components/Alert/index.ts', dest: 'src/components/ui/Alert/index.ts' },
      ],
      dependencies: ['framer-motion'],
    },
    flutter: {
      files: [
        { src: 'flutter/lib/src/widgets/ck_alert.dart', dest: 'lib/ui/ck_alert.dart' },
      ],
      pubDependencies: ['google_fonts'],
    },
  },
  divider: {
    description: 'Horizontal or vertical rule with optional label.',
    category: 'layout',
    tags: ['layout', 'separator'],
    react: {
      files: [
        { src: 'src/components/Divider/Divider.tsx', dest: 'src/components/ui/Divider.tsx' },
        { src: 'src/components/Divider/index.ts', dest: 'src/components/ui/Divider/index.ts' },
      ],
    },
    flutter: {
      files: [
        { src: 'flutter/lib/src/widgets/ck_divider.dart', dest: 'lib/ui/ck_divider.dart' },
      ],
      pubDependencies: ['google_fonts'],
    },
  },
  slider: {
    description: 'Range slider with marks, color variants, and value badge.',
    category: 'input',
    tags: ['form', 'range', 'input'],
    react: {
      files: [
        { src: 'src/components/Slider/Slider.tsx', dest: 'src/components/ui/Slider.tsx' },
        { src: 'src/components/Slider/index.ts', dest: 'src/components/ui/Slider/index.ts' },
      ],
      dependencies: ['framer-motion'],
    },
    flutter: {
      files: [
        { src: 'flutter/lib/src/widgets/ck_slider.dart', dest: 'lib/ui/ck_slider.dart' },
      ],
    },
  },
  progress: {
    description: 'Determinate and indeterminate progress bar with striped and animated modes.',
    category: 'display',
    tags: ['loading', 'feedback', 'state'],
    react: {
      files: [
        { src: 'src/components/Progress/Progress.tsx', dest: 'src/components/ui/Progress.tsx' },
        { src: 'src/components/Progress/index.ts', dest: 'src/components/ui/Progress/index.ts' },
      ],
    },
    flutter: {
      files: [
        { src: 'flutter/lib/src/widgets/ck_progress.dart', dest: 'lib/ui/ck_progress.dart' },
      ],
    },
  },
  spinner: {
    description: 'Animated loading spinner with dual-arc design and color variants.',
    category: 'display',
    tags: ['loading', 'state', 'animation'],
    react: {
      files: [
        { src: 'src/components/Spinner/Spinner.tsx', dest: 'src/components/ui/Spinner.tsx' },
        { src: 'src/components/Spinner/index.ts', dest: 'src/components/ui/Spinner/index.ts' },
      ],
      dependencies: ['framer-motion'],
    },
    flutter: {
      files: [
        { src: 'flutter/lib/src/widgets/ck_spinner.dart', dest: 'lib/ui/ck_spinner.dart' },
      ],
    },
  },
  tabs: {
    description: 'Tab navigation with underline, pills, and boxed variants.',
    category: 'navigation',
    tags: ['navigation', 'layout', 'interactive'],
    react: {
      files: [
        { src: 'src/components/Tabs/Tabs.tsx', dest: 'src/components/ui/Tabs.tsx' },
        { src: 'src/components/Tabs/index.ts', dest: 'src/components/ui/Tabs/index.ts' },
      ],
      dependencies: ['framer-motion'],
    },
    flutter: {
      files: [
        { src: 'flutter/lib/src/widgets/ck_tabs.dart', dest: 'lib/ui/ck_tabs.dart' },
      ],
      pubDependencies: ['google_fonts'],
    },
  },
  accordion: {
    description: 'Animated expandable panels — default, bordered, and separated variants.',
    category: 'navigation',
    tags: ['layout', 'disclosure', 'interactive'],
    react: {
      files: [
        { src: 'src/components/Accordion/Accordion.tsx', dest: 'src/components/ui/Accordion.tsx' },
        { src: 'src/components/Accordion/index.ts', dest: 'src/components/ui/Accordion/index.ts' },
      ],
      dependencies: ['framer-motion'],
    },
    flutter: {
      files: [
        { src: 'flutter/lib/src/widgets/ck_accordion.dart', dest: 'lib/ui/ck_accordion.dart' },
      ],
      pubDependencies: ['google_fonts'],
    },
  },
};

export const componentNames = Object.keys(registry);
