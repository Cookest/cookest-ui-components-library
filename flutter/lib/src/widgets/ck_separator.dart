import 'package:flutter/material.dart';
import '../tokens/cookest_tokens.dart';

/// A separator component matching the web @cookest/ui Separator.
class CkSeparator extends StatelessWidget {
  const CkSeparator({
    super.key,
    this.orientation = Axis.horizontal,
    this.thickness = 1.0,
    this.color,
  });

  final Axis orientation;
  final double thickness;
  final Color? color;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final borderColor = color ?? (isDark
        ? CookestTokens.colorBorderDark
        : CookestTokens.colorBorderLight);

    if (orientation == Axis.horizontal) {
      return Container(
        height: thickness,
        width: double.infinity,
        color: borderColor,
      );
    } else {
      return Container(
        width: thickness,
        height: double.infinity,
        color: borderColor,
      );
    }
  }
}
