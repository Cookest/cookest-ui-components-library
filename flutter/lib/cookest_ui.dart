/// Cookest UI — Cross-platform Flutter widget library.
///
/// Provides the same design system and components as the web
/// `@cookest/ui` React library, built from shared design tokens.
///
/// ## Quick start
///
/// ```dart
/// import 'package:cookest_ui/cookest_ui.dart';
///
/// MaterialApp(
///   theme: CookestTheme.light,
///   darkTheme: CookestTheme.dark,
///   home: Scaffold(
///     body: CkButton(
///       onPressed: () {},
///       child: Text('Get Started'),
///     ),
///   ),
/// );
/// ```
library cookest_ui;

// Tokens (generated from shared JSON)
export 'src/tokens/cookest_tokens.dart';

// Theme
export 'src/theme/cookest_theme.dart';

// Widgets
export 'src/widgets/ck_accordion.dart';
export 'src/widgets/ck_alert.dart';
export 'src/widgets/ck_avatar.dart';
export 'src/widgets/ck_badge.dart';
export 'src/widgets/ck_button.dart';
export 'src/widgets/ck_card.dart';
export 'src/widgets/ck_divider.dart';
export 'src/widgets/ck_input.dart';
export 'src/widgets/ck_modal.dart';
export 'src/widgets/ck_progress.dart';
export 'src/widgets/ck_select.dart';
export 'src/widgets/ck_skeleton.dart';
export 'src/widgets/ck_slider.dart';
export 'src/widgets/ck_spinner.dart';
export 'src/widgets/ck_tabs.dart';
export 'src/widgets/ck_textarea.dart';
export 'src/widgets/ck_toggle.dart';
export 'src/widgets/ck_tooltip.dart';
