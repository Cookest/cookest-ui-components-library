import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../tokens/cookest_tokens.dart';

/// Modal size matching the React Modal component.
enum CkModalSize { sm, md, lg }

/// A modal dialog matching the web @cookest/ui Modal.
///
/// Usage:
/// ```dart
/// CkModal.show(
///   context: context,
///   title: 'Confirm',
///   builder: (context) => Text('Are you sure?'),
/// );
/// ```
class CkModal extends StatelessWidget {
  const CkModal({
    super.key,
    this.title,
    this.size = CkModalSize.md,
    this.closeOnBackdrop = true,
    required this.child,
    this.footer,
  });

  final String? title;
  final CkModalSize size;
  final bool closeOnBackdrop;
  final Widget child;
  final Widget? footer;

  double get _maxWidth {
    switch (size) {
      case CkModalSize.sm:
        return 384;
      case CkModalSize.md:
        return 512;
      case CkModalSize.lg:
        return 672;
    }
  }

  /// Show the modal as a dialog.
  static Future<T?> show<T>({
    required BuildContext context,
    String? title,
    CkModalSize size = CkModalSize.md,
    bool closeOnBackdrop = true,
    required WidgetBuilder builder,
    Widget? footer,
  }) {
    return showGeneralDialog<T>(
      context: context,
      barrierDismissible: closeOnBackdrop,
      barrierLabel: 'Dismiss',
      barrierColor: Colors.black54,
      transitionDuration: const Duration(milliseconds: 200),
      transitionBuilder: (context, animation, secondaryAnimation, child) {
        return ScaleTransition(
          scale: CurvedAnimation(
            parent: animation,
            curve: Curves.easeOut,
          ).drive(Tween(begin: 0.95, end: 1.0)),
          child: FadeTransition(
            opacity: animation,
            child: child,
          ),
        );
      },
      pageBuilder: (context, _, __) {
        return CkModal(
          title: title,
          size: size,
          closeOnBackdrop: closeOnBackdrop,
          footer: footer,
          child: builder(context),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final surfaceColor = isDark
        ? CookestTokens.colorSurfaceDark
        : CookestTokens.colorSurfaceLight;
    final headingColor = isDark
        ? CookestTokens.colorHeadingDark
        : CookestTokens.colorHeadingLight;
    final textColor = isDark
        ? CookestTokens.colorTextDark
        : CookestTokens.colorTextLight;
    final mutedColor = isDark
        ? CookestTokens.colorMutedDark
        : CookestTokens.colorMutedLight;
    final borderColor = isDark
        ? CookestTokens.colorBorderDark
        : CookestTokens.colorBorderLight;

    return Center(
      child: Material(
        color: Colors.transparent,
        child: Container(
          constraints: BoxConstraints(maxWidth: _maxWidth),
          margin: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: surfaceColor,
            borderRadius: BorderRadius.circular(CookestTokens.radiusN2xl),
            boxShadow: [
              BoxShadow(
                color: CookestTokens.colorBlack.withAlpha(51),
                blurRadius: 25,
                offset: const Offset(0, 10),
              ),
            ],
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              if (title != null)
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 24,
                    vertical: 16,
                  ),
                  decoration: BoxDecoration(
                    border: Border(
                      bottom: BorderSide(color: borderColor),
                    ),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        title!,
                        style: GoogleFonts.playfairDisplay(
                          fontSize: CookestTokens.fontSizeLg,
                          fontWeight: CookestTokens.fontWeightSemibold,
                          color: headingColor,
                        ),
                      ),
                      GestureDetector(
                        onTap: () => Navigator.of(context).pop(),
                        child: Container(
                          padding: const EdgeInsets.all(6),
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(
                              CookestTokens.radiusLg,
                            ),
                          ),
                          child: Icon(
                            Icons.close,
                            size: 20,
                            color: mutedColor,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              Padding(
                padding: const EdgeInsets.symmetric(
                  horizontal: 24,
                  vertical: 20,
                ),
                child: DefaultTextStyle(
                  style: GoogleFonts.inter(
                    fontSize: CookestTokens.fontSizeSm,
                    color: textColor,
                  ),
                  child: child,
                ),
              ),
              if (footer != null)
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 24,
                    vertical: 16,
                  ),
                  decoration: BoxDecoration(
                    border: Border(
                      top: BorderSide(color: borderColor),
                    ),
                  ),
                  child: footer!,
                ),
            ],
          ),
        ),
      ),
    );
  }
}
