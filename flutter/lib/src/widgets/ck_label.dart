import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../tokens/cookest_tokens.dart';

/// A label component matching the web @cookest/ui Label.
class CkLabel extends StatelessWidget {
  const CkLabel({
    super.key,
    required this.child,
    this.enabled = true,
  });

  final Widget child;
  final bool enabled;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final headingColor = isDark
        ? CookestTokens.colorHeadingDark
        : CookestTokens.colorHeadingLight;

    return Opacity(
      opacity: enabled ? 1.0 : 0.7,
      child: DefaultTextStyle(
        style: GoogleFonts.inter(
          fontSize: CookestTokens.fontSizeSm,
          fontWeight: CookestTokens.fontWeightMedium,
          color: headingColor,
          height: 1.0,
        ),
        child: child,
      ),
    );
  }
}
