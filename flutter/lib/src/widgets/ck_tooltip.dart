import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../tokens/cookest_tokens.dart';

/// Tooltip position matching the React Tooltip component.
enum CkTooltipPosition { top, bottom, left, right }

/// A tooltip matching the web @cookest/ui Tooltip.
class CkTooltip extends StatelessWidget {
  const CkTooltip({
    super.key,
    required this.message,
    required this.child,
    this.position = CkTooltipPosition.top,
    this.waitDuration = const Duration(milliseconds: 200),
  });

  final String message;
  final Widget child;
  final CkTooltipPosition position;
  final Duration waitDuration;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final bgColor = isDark
        ? CookestTokens.colorSurfaceDark
        : CookestTokens.colorHeadingLight;
    final textColor = isDark
        ? CookestTokens.colorHeadingDark
        : CookestTokens.colorWhite;

    final bool preferBelow;
    switch (position) {
      case CkTooltipPosition.top:
        preferBelow = false;
      case CkTooltipPosition.bottom:
        preferBelow = true;
      case CkTooltipPosition.left:
      case CkTooltipPosition.right:
        preferBelow = false;
    }

    return Tooltip(
      message: message,
      preferBelow: preferBelow,
      waitDuration: waitDuration,
      decoration: BoxDecoration(
        color: bgColor,
        borderRadius: BorderRadius.circular(CookestTokens.radiusLg),
        boxShadow: [
          BoxShadow(
            color: CookestTokens.colorBlack.withAlpha(38),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      textStyle: GoogleFonts.inter(
        fontSize: CookestTokens.fontSizeXs,
        fontWeight: CookestTokens.fontWeightMedium,
        color: textColor,
      ),
      child: child,
    );
  }
}
