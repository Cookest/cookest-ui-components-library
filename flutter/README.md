# cookest_ui — Flutter Widget Library

A Flutter implementation of the [Cookest design system](https://github.com/Cookest/cookest-ui-components-library), sharing the same design tokens, visual language, and component API as the web `@cookest/ui` React library.

## Components

| Widget | Description |
|---|---|
| `CkButton` | Primary, secondary, ghost, danger — with loading state & icons |
| `CkInput` | Text field with label, error, helper, leading/trailing icons |
| `CkTextarea` | Multi-line input with character count and auto-sizing |
| `CkCard` | Container with header, body, and interactive variant |
| `CkBadge` | Status labels — info, success, warning, error, neutral |
| `CkAvatar` | Image or initials with size variants and fallback |
| `CkModal` | Bottom sheet / dialog with animated transitions |
| `CkTooltip` | Contextual tooltip overlay |
| `CkToggle` | Animated on/off switch |
| `CkSelect` | Dropdown picker with search support |
| `CkSkeleton` | Loading placeholders — text, circle, card |
| `CkAlert` | Info, success, warning, error banners with dismiss |
| `CkDivider` | Horizontal / vertical rule with optional label |
| `CkSlider` | Range slider with marks, colors, and value badge |
| `CkProgress` | Determinate / indeterminate progress bar |
| `CkSpinner` | Animated loading spinner with custom arc |
| `CkTabs` | Tab navigation — underline, pills, boxed variants |
| `CkAccordion` | Animated expandable panels — default, bordered, separated |

---

## Installation

Add the package to your `pubspec.yaml` using a local path (monorepo setup):

```yaml
dependencies:
  cookest_ui:
    path: ../ui-components/flutter
  google_fonts: ^8.0.0
```

Then run:

```bash
flutter pub get
```

---

## Setup

### 1. Apply the theme

Wrap your app with `CookestTheme.light` / `CookestTheme.dark` so all widgets automatically pick up the correct colors, typography, and border radii:

```dart
import 'package:cookest_ui/cookest_ui.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Cookest',
      theme: CookestTheme.light,
      darkTheme: CookestTheme.dark,
      themeMode: ThemeMode.system,
      home: const HomePage(),
    );
  }
}
```

### 2. Import and use

```dart
import 'package:cookest_ui/cookest_ui.dart';
```

All widgets, tokens, and enums are exported from this single import.

---

## Component Usage

### CkButton

```dart
// Primary action
CkButton(
  onPressed: () {},
  child: const Text('Save Recipe'),
)

// Secondary with leading icon
CkButton(
  variant: CkButtonVariant.secondary,
  iconLeft: const Icon(Icons.add, size: 16),
  child: const Text('Add Ingredient'),
)

// Loading state
CkButton(
  loading: true,
  onPressed: null,
  child: const Text('Saving...'),
)

// Sizes: sm / md (default) / lg
CkButton(
  size: CkButtonSize.lg,
  fullWidth: true,
  onPressed: () {},
  child: const Text('Get Started'),
)
```

### CkInput

```dart
CkInput(
  label: 'Email',
  placeholder: 'you@cookest.com',
  type: CkInputType.email,
  prefixIcon: const Icon(Icons.email_outlined, size: 18),
)

// With error
CkInput(
  label: 'Password',
  type: CkInputType.password,
  errorText: 'Must be at least 8 characters',
)
```

### CkTextarea

```dart
CkTextarea(
  label: 'Recipe Description',
  placeholder: 'Describe the flavors, technique, and origin...',
  maxLength: 500,
  showCount: true,
  minLines: 4,
  maxLines: 8,
  onChanged: (val) => setState(() => _description = val),
)
```

### CkCard

```dart
CkCard(
  header: const Text('Weekly Meal Plan'),
  child: Column(
    children: [
      // card body content
    ],
  ),
)

// Interactive (tap ripple)
CkCard(
  interactive: true,
  onTap: () => Navigator.push(...),
  child: RecipePreview(recipe: recipe),
)
```

### CkBadge

```dart
// Variants: info, success, warning, error, neutral
CkBadge(label: 'Published', variant: CkBadgeVariant.success)
CkBadge(label: 'Draft', variant: CkBadgeVariant.neutral, dot: true)
```

### CkAlert

```dart
// Info / success / warning / error
CkAlert(
  variant: CkAlertVariant.success,
  title: 'Recipe saved!',
  child: const Text('Your changes have been saved to your meal plan.'),
)

// Dismissible
CkAlert(
  variant: CkAlertVariant.warning,
  dismissible: true,
  onDismiss: () => setState(() => _showWarning = false),
  child: const Text('Unsaved changes will be lost.'),
)
```

### CkSlider

```dart
CkSlider(
  value: _cookTime,
  min: 5,
  max: 120,
  step: 5,
  color: CkSliderColor.primary,
  showValue: true,
  label: 'Cook Time (min)',
  onChanged: (v) => setState(() => _cookTime = v),
  marks: const [
    CkSliderMark(value: 5, label: '5m'),
    CkSliderMark(value: 60, label: '1h'),
    CkSliderMark(value: 120, label: '2h'),
  ],
)
```

### CkProgress

```dart
// Determinate (0–100)
CkProgress(
  value: _uploadProgress,
  color: CkProgressColor.primary,
  showLabel: true,
  label: 'Uploading recipe...',
)

// Indeterminate (null value)
CkProgress(color: CkProgressColor.blue)

// Striped
CkProgress(value: 60, striped: true, animated: true)
```

### CkSpinner

```dart
// Standalone
const CkSpinner(color: CkSpinnerColor.primary, size: CkSpinnerSize.md)

// Inside a button
CkButton(
  onPressed: _isSaving ? null : _save,
  child: _isSaving
      ? const Row(children: [
          CkSpinner(color: CkSpinnerColor.white, size: CkSpinnerSize.sm),
          SizedBox(width: 8),
          Text('Saving...'),
        ])
      : const Text('Save'),
)
```

### CkTabs

```dart
CkTabs(
  variant: CkTabsVariant.underline,
  items: [
    CkTabItem(
      id: 'ingredients',
      label: 'Ingredients',
      icon: const Icon(Icons.list_alt),
      content: IngredientsList(recipe: recipe),
    ),
    CkTabItem(
      id: 'method',
      label: 'Method',
      badge: '5 steps',
      content: MethodSteps(recipe: recipe),
    ),
    CkTabItem(
      id: 'nutrition',
      label: 'Nutrition',
      content: NutritionPanel(recipe: recipe),
    ),
  ],
  onChanged: (id) => debugPrint('Switched to $id'),
)
```

### CkAccordion

```dart
CkAccordion(
  variant: CkAccordionVariant.default_,
  items: [
    CkAccordionItem(
      id: 'substitutions',
      title: 'Ingredient Substitutions',
      subtitle: '3 alternatives available',
      content: const Text('You can replace butter with coconut oil...'),
    ),
    CkAccordionItem(
      id: 'storage',
      title: 'Storage & Reheating',
      content: Column(children: [
        const Text('Store in an airtight container for up to 3 days.'),
      ]),
    ),
  ],
)

// Multiple panels open simultaneously
CkAccordion(
  multiple: true,
  variant: CkAccordionVariant.separated,
  defaultOpen: {'substitutions'},
  items: items,
)
```

### CkToggle

```dart
CkToggle(
  value: _darkMode,
  label: 'Dark mode',
  onChanged: (v) => setState(() => _darkMode = v),
)
```

### CkSkeleton

```dart
// Text lines
CkSkeleton(lines: 3)

// Avatar placeholder
CkSkeleton.circle(size: 40)

// Card placeholder
CkSkeleton.card()
```

### CkDivider

```dart
// Horizontal
const CkDivider()

// With label
const CkDivider(label: 'or continue with')

// Vertical (inside Row)
const CkDivider(axis: Axis.vertical)
```

---

## Design Tokens

Access raw tokens via `CookestTokens`:

```dart
import 'package:cookest_ui/cookest_ui.dart';

Container(
  color: CookestTokens.colorPrimaryDEFAULT, // #7A9A65 sage green
  padding: const EdgeInsets.all(CookestTokens.componentspacingMd),
  child: Text(
    'Hello',
    style: TextStyle(
      fontSize: CookestTokens.fontSizeLg,
      fontWeight: CookestTokens.fontWeightSemibold,
      color: CookestTokens.colorHeadingLight,
    ),
  ),
)
```

### Color palette

| Token | Value | Usage |
|---|---|---|
| `colorPrimaryDEFAULT` | `#7A9A65` | Brand sage green |
| `colorPrimaryLight` | `#B4CC9E` | Tints, hover states |
| `colorPrimaryDark` | `#4E7A3A` | Dark variant |
| `colorBackgroundLight` | `#F5F5F0` | Light page bg |
| `colorBackgroundDark` | `#0E1512` | Dark page bg |
| `colorHeadingLight` | `#1C3A2A` | Heading text light |
| `colorHeadingDark` | `#E0EDE4` | Heading text dark |
| `colorStatusSuccess` | `#4CAF50` | Success states |
| `colorStatusWarning` | `#FF9800` | Warning states |
| `colorStatusError` | `#F44336` | Error states |
| `colorStatusInfo` | `#2196F3` | Info states |

### Spacing scale

Follows a 4px base grid: `spacingN1` (4px) → `spacingN32` (128px).  
Component-specific shorthands: `componentspacingXs` → `componentspacingN3xl`.

### Border radii

`radiusSm` (4) · `radiusMd` (8) · `radiusLg` (12) · `radiusXl` (16) · `radiusN2xl` (24) · `radiusFull` (9999)

### Typography

```dart
// Serif headings (Playfair Display)
GoogleFonts.playfairDisplay(fontSize: CookestTokens.fontSizeN3xl)

// Sans body (Inter) — used by all widgets by default
GoogleFonts.inter(fontSize: CookestTokens.fontSizeSm)
```

---

## Theming

`CookestTheme` exposes `light` and `dark` `ThemeData` objects with:

- Material 3 colour scheme derived from the brand palette
- Pre-configured `TextTheme` using Playfair Display + Inter via `google_fonts`
- Elevated card shadows, border radii, and input decoration themes

```dart
// Customise on top of the base theme
MaterialApp(
  theme: CookestTheme.light.copyWith(
    colorScheme: CookestTheme.light.colorScheme.copyWith(
      primary: const Color(0xFF5A8050), // override primary
    ),
  ),
)
```

---

## Shared Design System

This Flutter package is part of the **Cookest monorepo** and shares design tokens with the web `@cookest/ui` React component library:

```
ui-components/
├── src/          ← React components (@cookest/ui)
├── flutter/      ← Flutter widgets (cookest_ui)
└── tokens/       ← Shared JSON design tokens
```

Token changes flow through Style Dictionary:
1. Edit `tokens/*.json`
2. Run `bun run tokens:build` from `ui-components/`
3. Both `src/styles.css` (web) and `flutter/lib/src/tokens/cookest_tokens.dart` (Flutter) are regenerated

---

## Running the example app

```bash
cd app/          # The Flutter app (uses cookest_ui)
flutter pub get
flutter run
```

---

## Component parity

| Component | React (`@cookest/ui`) | Flutter (`cookest_ui`) |
|---|---|---|
| Button | ✅ | ✅ |
| Input | ✅ | ✅ |
| Textarea | ✅ | ✅ |
| Card | ✅ | ✅ |
| Badge | ✅ | ✅ |
| Avatar | ✅ | ✅ |
| Modal | ✅ | ✅ |
| Tooltip | ✅ | ✅ |
| Toggle | ✅ | ✅ |
| Select | ✅ | ✅ |
| Skeleton | ✅ | ✅ |
| Alert | ✅ | ✅ |
| Divider | ✅ | ✅ |
| Slider | ✅ | ✅ |
| Progress | ✅ | ✅ |
| Spinner | ✅ | ✅ |
| Tabs | ✅ | ✅ |
| Accordion | ✅ | ✅ |
