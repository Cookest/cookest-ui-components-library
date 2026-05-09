import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../tokens/cookest_tokens.dart';

/// Side for [CkSheet].
enum CkSheetSide { left, right, top, bottom }

/// A sheet component matching the web @cookest/ui Sheet (Side Drawer).
class CkSheet extends StatelessWidget {
  const CkSheet({
    super.key,
    this.title,
    this.description,
    this.side = CkSheetSide.right,
    required this.child,
    this.footer,
  });

  final String? title;
  final String? description;
  final CkSheetSide side;
  final Widget child;
  final Widget? footer;

  static Future<T?> show<T>(
    BuildContext context, {
    String? title,
    String? description,
    CkSheetSide side = CkSheetSide.right,
    required Widget child,
    Widget? footer,
  }) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final surfaceColor = isDark
        ? CookestTokens.colorSurfaceDark
        : CookestTokens.colorSurfaceLight;

    Offset beginOffset;
    switch (side) {
      case CkSheetSide.left: beginOffset = const Offset(-1, 0); break;
      case CkSheetSide.right: beginOffset = const Offset(1, 0); break;
      case CkSheetSide.top: beginOffset = const Offset(0, -1); break;
      case CkSheetSide.bottom: beginOffset = const Offset(0, 1); break;
    }

    return showGeneralDialog<T>(
      context: context,
      barrierDismissible: true,
      barrierLabel: 'Dismiss',
      barrierColor: Colors.black54,
      transitionDuration: const Duration(milliseconds: 300),
      transitionBuilder: (context, animation, secondaryAnimation, child) {
        return SlideTransition(
          position: animation.drive(
            Tween(begin: beginOffset, end: Offset.zero).chain(
              CurveTween(curve: Curves.easeOutCubic),
            ),
          ),
          child: child,
        );
      },
      pageBuilder: (context, animation1, animation2) {
        return Align(
          alignment: _getAlignment(side),
          child: Material(
            color: surfaceColor,
            child: CkSheet(
              title: title,
              description: description,
              side: side,
              footer: footer,
              child: child,
            ),
          ),
        );
      },
    );
  }

  static Alignment _getAlignment(CkSheetSide side) {
    switch (side) {
      case CkSheetSide.left: return Alignment.centerLeft;
      case CkSheetSide.right: return Alignment.centerRight;
      case CkSheetSide.top: return Alignment.topCenter;
      case CkSheetSide.bottom: return Alignment.bottomCenter;
    }
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

    final isVertical = side == CkSheetSide.left || side == CkSheetSide.right;
    final width = isVertical ? 320.0 : double.infinity;
    final height = isVertical ? double.infinity : 320.0;

    return Container(
      width: width,
      height: height,
      decoration: BoxDecoration(
        border: Border(
          left: side == CkSheetSide.right ? BorderSide(color: borderColor) : BorderSide.none,
          right: side == CkSheetSide.left ? BorderSide(color: borderColor) : BorderSide.none,
          top: side == CkSheetSide.bottom ? BorderSide(color: borderColor) : BorderSide.none,
          bottom: side == CkSheetSide.top ? BorderSide(color: borderColor) : BorderSide.none,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Padding(
            padding: const EdgeInsets.all(24),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    if (title != null)
                      Text(
                        title!,
                        style: GoogleFonts.playfairDisplay(
                          fontSize: CookestTokens.fontSizeXl,
                          fontWeight: CookestTokens.fontWeightBold,
                          color: headingColor,
                        ),
                      ),
                    IconButton(
                      icon: const Icon(Icons.close),
                      onPressed: () => Navigator.of(context).pop(),
                      color: mutedColor,
                      iconSize: 20,
                    ),
                  ],
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
          Expanded(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24),
              child: child,
            ),
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
