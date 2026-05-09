import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../tokens/cookest_tokens.dart';

/// A bottom drawer component matching the web @cookest/ui Drawer.
class CkDrawer extends StatelessWidget {
  const CkDrawer({
    super.key,
    this.title,
    this.description,
    required this.child,
    this.footer,
  });

  final String? title;
  final String? description;
  final Widget child;
  final Widget? footer;

  static Future<T?> show<T>(
    BuildContext context, {
    String? title,
    String? description,
    required Widget child,
    Widget? footer,
  }) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final surfaceColor = isDark
        ? CookestTokens.colorSurfaceDark
        : CookestTokens.colorSurfaceLight;

    return showModalBottomSheet<T>(
      context: context,
      backgroundColor: surfaceColor,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(
          top: Radius.circular(CookestTokens.radiusN2xl),
        ),
      ),
      builder: (context) => CkDrawer(
        title: title,
        description: description,
        footer: footer,
        child: child,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final headingColor = isDark
        ? CookestTokens.colorHeadingDark
        : CookestTokens.colorHeadingLight;
    final mutedColor = isDark
        ? CookestTokens.colorMutedDark
        : CookestTokens.colorMutedLight;
    final borderColor = isDark
        ? CookestTokens.colorBorderDark
        : CookestTokens.colorBorderLight;

    return Container(
      padding: EdgeInsets.only(
        bottom: MediaQuery.of(context).viewInsets.bottom,
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          // Drag handle
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 12),
            child: Container(
              width: 32,
              height: 4,
              decoration: BoxDecoration(
                color: borderColor,
                borderRadius: BorderRadius.circular(2),
              ),
            ),
          ),
          if (title != null)
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title!,
                    style: GoogleFonts.playfairDisplay(
                      fontSize: CookestTokens.fontSizeXl,
                      fontWeight: CookestTokens.fontWeightBold,
                      color: headingColor,
                    ),
                  ),
                  if (description != null) ...[
                    const SizedBox(height: 4),
                    Text(
                      description!,
                      style: GoogleFonts.inter(
                        fontSize: CookestTokens.fontSizeSm,
                        color: mutedColor,
                      ),
                    ),
                  ],
                ],
              ),
            ),
          Padding(
            padding: const EdgeInsets.all(24),
            child: child,
          ),
          if (footer != null)
            Container(
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                border: Border(
                  top: BorderSide(color: borderColor),
                ),
              ),
              child: footer!,
            ),
        ],
      ),
    );
  }
}
