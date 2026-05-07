import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../tokens/cookest_tokens.dart';

/// Divider orientation matching the React Divider component.
enum CkDividerOrientation { horizontal, vertical }

/// A divider component matching the web @cookest/ui Divider.
class CkDivider extends StatelessWidget {
  const CkDivider({
    super.key,
    this.orientation = CkDividerOrientation.horizontal,
    this.label,
  });

  final CkDividerOrientation orientation;
  final String? label;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final borderColor = isDark
        ? CookestTokens.colorBorderDark
        : CookestTokens.colorBorderLight;
    final mutedColor = isDark
        ? CookestTokens.colorMutedDark
        : CookestTokens.colorMutedLight;

    if (orientation == CkDividerOrientation.vertical) {
      return Container(
        width: 1,
        margin: const EdgeInsets.symmetric(horizontal: 8),
        color: borderColor,
      );
    }

    if (label != null) {
      return Row(
        children: [
          Expanded(child: Container(height: 1, color: borderColor)),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 12),
            child: Text(
              label!,
              style: GoogleFonts.inter(
                fontSize: CookestTokens.fontSizeXs,
                fontWeight: CookestTokens.fontWeightMedium,
                color: mutedColor,
              ),
            ),
          ),
          Expanded(child: Container(height: 1, color: borderColor)),
        ],
      );
    }

    return Container(height: 1, width: double.infinity, color: borderColor);
  }
}
