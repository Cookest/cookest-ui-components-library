import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../tokens/cookest_tokens.dart';

/// Badge variant matching the React Badge component.
enum CkBadgeVariant { standard, success, warning, error, info }

/// Badge size.
enum CkBadgeSize { sm, md, lg }

/// A badge/chip component matching the web @cookest/ui Badge.
class CkBadge extends StatelessWidget {
  const CkBadge({
    super.key,
    required this.child,
    this.variant = CkBadgeVariant.standard,
    this.size = CkBadgeSize.md,
    this.dot = false,
    this.removable = false,
    this.onRemove,
  });

  final Widget child;
  final CkBadgeVariant variant;
  final CkBadgeSize size;
  final bool dot;
  final bool removable;
  final VoidCallback? onRemove;

  Color _backgroundColor(bool isDark) {
    switch (variant) {
      case CkBadgeVariant.standard:
        return isDark
            ? CookestTokens.colorCardDark
            : CookestTokens.colorCardLight;
      case CkBadgeVariant.success:
        return isDark ? const Color(0x4D059669) : const Color(0xFFD1FAE5);
      case CkBadgeVariant.warning:
        return isDark ? const Color(0x4DD97706) : const Color(0xFFFEF3C7);
      case CkBadgeVariant.error:
        return isDark ? const Color(0x4DDC2626) : const Color(0xFFFEE2E2);
      case CkBadgeVariant.info:
        return isDark ? const Color(0x4D2563EB) : const Color(0xFFDBEAFE);
    }
  }

  Color _foregroundColor(bool isDark) {
    switch (variant) {
      case CkBadgeVariant.standard:
        return isDark
            ? CookestTokens.colorHeadingDark
            : CookestTokens.colorHeadingLight;
      case CkBadgeVariant.success:
        return isDark ? const Color(0xFF6EE7B7) : const Color(0xFF065F46);
      case CkBadgeVariant.warning:
        return isDark ? const Color(0xFFFCD34D) : const Color(0xFF92400E);
      case CkBadgeVariant.error:
        return isDark ? const Color(0xFFFCA5A5) : const Color(0xFF991B1B);
      case CkBadgeVariant.info:
        return isDark ? const Color(0xFF93C5FD) : const Color(0xFF1E40AF);
    }
  }

  Color get _dotColor {
    switch (variant) {
      case CkBadgeVariant.standard:
        return CookestTokens.colorMutedLight;
      case CkBadgeVariant.success:
        return const Color(0xFF10B981);
      case CkBadgeVariant.warning:
        return const Color(0xFFF59E0B);
      case CkBadgeVariant.error:
        return const Color(0xFFEF4444);
      case CkBadgeVariant.info:
        return const Color(0xFF3B82F6);
    }
  }

  EdgeInsets get _padding {
    switch (size) {
      case CkBadgeSize.sm:
        return const EdgeInsets.symmetric(horizontal: 6, vertical: 2);
      case CkBadgeSize.md:
        return const EdgeInsets.symmetric(horizontal: 10, vertical: 4);
      case CkBadgeSize.lg:
        return const EdgeInsets.symmetric(horizontal: 12, vertical: 6);
    }
  }

  double get _fontSize {
    switch (size) {
      case CkBadgeSize.sm:
        return 10;
      case CkBadgeSize.md:
        return CookestTokens.fontSizeXs;
      case CkBadgeSize.lg:
        return CookestTokens.fontSizeSm;
    }
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final bg = _backgroundColor(isDark);
    final fg = _foregroundColor(isDark);
    final borderColor = isDark
        ? CookestTokens.colorBorderDark
        : CookestTokens.colorBorderLight;

    return Container(
      padding: _padding,
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(CookestTokens.radiusFull),
        border: variant == CkBadgeVariant.standard
            ? Border.all(color: borderColor)
            : null,
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (dot)
            Container(
              width: 6,
              height: 6,
              margin: const EdgeInsets.only(right: 6),
              decoration: BoxDecoration(
                color: _dotColor,
                shape: BoxShape.circle,
              ),
            ),
          DefaultTextStyle(
            style: GoogleFonts.inter(
              fontSize: _fontSize,
              fontWeight: CookestTokens.fontWeightMedium,
              color: fg,
            ),
            child: child,
          ),
          if (removable)
            GestureDetector(
              onTap: onRemove,
              child: Padding(
                padding: const EdgeInsets.only(left: 4),
                child: Icon(Icons.close, size: 12, color: fg),
              ),
            ),
        ],
      ),
    );
  }
}
